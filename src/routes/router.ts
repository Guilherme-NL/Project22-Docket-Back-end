import { Router } from "express";
import authRouter from "./authRouter.js";
import notesRouter from "./notesRouter.js";

const router = Router();

router.use(authRouter, notesRouter);

export default router;
