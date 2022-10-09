import { Router } from "express";
import authRouter from "./authRouter.js";
import folderRouter from "./foldersRouter.js";
import notesRouter from "./notesRouter.js";

const router = Router();

router.use(authRouter, notesRouter, folderRouter);

export default router;
