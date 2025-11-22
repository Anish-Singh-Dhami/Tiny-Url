import { Router, type Request, type Response } from "express";
import {
  createUniqueLink,
  deleteLinkById,
  getAllLinks,
  getStatusById,
} from "../controllers/linkController.js";

const linkRouter = Router();

linkRouter.get("/", getAllLinks);

linkRouter.post("/", createUniqueLink);

linkRouter.get("/:code", getStatusById);

linkRouter.delete("/:code", deleteLinkById);

export default linkRouter;
