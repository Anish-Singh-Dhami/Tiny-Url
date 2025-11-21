import express, { type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 4000;
const BASE_URL = process.env.BASE_URL || "http://localhost";

app.get("/healthz", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", version: "1.0.0" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}:${PORT}`);
});
