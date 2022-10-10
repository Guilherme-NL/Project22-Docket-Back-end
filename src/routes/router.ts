import { Router } from "express";
import authRouter from "./authRouter.js";
import e2eRouter from "./e2eRouter.js";
import folderRouter from "./foldersRouter.js";
import notesRouter from "./notesRouter.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.use(authRouter, notesRouter, folderRouter);
if (process.env.NODE_ENV === "test") {
  router.use(e2eRouter);
}

export default router;
