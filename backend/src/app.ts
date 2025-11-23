import express, { type Request, type Response } from "express";
import linkRouter from "./routes/linksRoute.js";
import { redirectToTarget } from "./controllers/linkController.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/links", linkRouter);

app.get("/healthz", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", version: "1.0.0" });
});

// Server-side redirect for short codes at root path (returns real HTTP 302)
app.get("/:code", redirectToTarget);

export default app;
