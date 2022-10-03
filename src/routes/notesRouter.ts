import { Router } from "express";
import { addNotes, getNotes } from "../controllers/notesController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateToken } from "../middlewares/validateAuthorization.js";
import { userSigninSchema, userSignupSchema } from "../schemas/authSchema.js";

const notesRouter = Router();

notesRouter.post("/add/notes", validateToken, addNotes);
notesRouter.get("/get/notes", validateToken, getNotes);

export default notesRouter;
