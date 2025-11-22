import type { Request, Response } from "express";

// list all links
export const getAllLinks = (req: Request, res: Response) => {
  res.status(200).json({ message: "list of links" });
};

// create a new link (409 if code already exists)
export const createUniqueLink = (req: Request, res: Response) => {
  res.status(201).json({ message: "link created" });
};

// status of a specific link
export const getStatusById = (req: Request, res: Response) => {
  res.status(200).json({ message: `status of link code ${req.params.code}` });
};

// delete a specific link
export const deleteLinkById = (req: Request, res: Response) => {
  res.status(200).json({ message: `link code ${req.params.code} deleted` });
};
