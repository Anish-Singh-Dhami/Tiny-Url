import type { Request, Response } from "express";
import pool from "../config/database.js";
import type { TinyUrls } from "../models/TinyUrls.js";
import {
  SELECT_ALL_LINKS,
  SELECT_EXISTS_BY_CODE,
  INSERT_LINK,
  SELECT_BY_CODE,
  DELETE_BY_CODE,
  UPDATE_CLICK_AND_RETURN_URL,
} from "../db/queries/linksQueries.js";

const CODE_PATTERN = /^[A-Za-z0-9]{6,8}$/;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateCode(len = 6) {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return out;
}

async function generateUniqueCode() {
  // Try lengths 6,7,8 then loop until unique (with safe guard)
  const triesLimit = 10_000;
  let tries = 0;
  for (const len of [6, 7, 8]) {
    for (let i = 0; i < 100; i++) {
      const code = generateCode(len);
      const { rowCount } = await pool.query(
        "SELECT 1 FROM tiny_urls WHERE short_code = $1",
        [code]
      );
      if (rowCount === 0) return code;
      tries++;
      if (tries > triesLimit) break;
    }
  }
  // Last resort: keep trying until unique
  while (tries < triesLimit) {
    const code = generateCode(8);
    const { rowCount } = await pool.query(
      "SELECT 1 FROM tiny_urls WHERE short_code = $1",
      [code]
    );
    if (rowCount === 0) return code;
    tries++;
  }
  throw new Error("Unable to generate unique code");
}

// list all links
export const getAllLinks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<TinyUrls>(SELECT_ALL_LINKS);
    const rows: TinyUrls[] = result.rows as TinyUrls[];
    return res.status(200).json(rows);
  } catch (err) {
    console.error("getAllLinks error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// create a new link (409 if code already exists)
export const createUniqueLink = async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const longUrlRaw: string | undefined =
      body.long_url || body.target_url || body.url;
    if (!longUrlRaw || typeof longUrlRaw !== "string") {
      return res
        .status(400)
        .json({ message: "`long_url` (or `target_url`) is required" });
    }
    const longUrl = String(longUrlRaw).trim();

    // Basic URL format validation
    try {
      new URL(longUrl);
    } catch (err) {
      return res.status(400).json({ message: "Invalid target URL" });
    }

    let customCode: string | undefined = body.custom_code || body.code;

    if (customCode) {
      customCode = String(customCode).trim();
      if (!CODE_PATTERN.test(customCode)) {
        return res
          .status(400)
          .json({ message: "custom_code must be 6-8 alphanumeric characters" });
      }
      // check unique
      const exists = await pool.query(SELECT_EXISTS_BY_CODE, [customCode]);
      if ((exists?.rowCount ?? 0) > 0) {
        return res.status(409).json({ message: "custom code already exists" });
      }
    }

    // generate if not provided
    const code = customCode ?? (await generateUniqueCode());

    const insert = await pool.query<TinyUrls>(INSERT_LINK, [code, longUrl]);
    const created = insert.rows[0] as TinyUrls;
    return res.status(201).json(created);
  } catch (err: any) {
    console.error("createUniqueLink error", err);
    return res
      .status(500)
      .json({ message: err?.message || "Internal server error" });
  }
};

// status of a specific link
export const getStatusById = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const result = await pool.query<TinyUrls>(SELECT_BY_CODE, [code]);
    if ((result?.rowCount ?? 0) === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    const row = result.rows[0] as TinyUrls;
    return res.status(200).json(row);
  } catch (err) {
    console.error("getStatusById error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete a specific link
export const deleteLinkById = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const del = await pool.query(DELETE_BY_CODE, [code]);
    if (del.rowCount === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: `link code ${code} deleted` });
  } catch (err) {
    console.error("deleteLinkById error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// redirect handler for server-side 302 (increments clicks & last_clicked then redirects)
export const redirectToTarget = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const result = await pool.query(UPDATE_CLICK_AND_RETURN_URL, [code]);
    if ((result?.rowCount ?? 0) === 0) {
      return res.status(404).send("Not found");
    }
    const target = result.rows[0].target_url;
    // perform a real HTTP 302 redirect
    return res.redirect(302, target);
  } catch (err) {
    console.error("redirectToTarget error", err);
    return res.status(500).send("Internal server error");
  }
};
