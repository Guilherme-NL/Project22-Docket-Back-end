import { Router } from "express";
import {
  addNotes,
  deleteNotes,
  getNotes,
  updateNotes,
} from "../controllers/notesController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateToken } from "../middlewares/validateAuthorization.js";
import { userSigninSchema, userSignupSchema } from "../schemas/authSchema.js";

const notesRouter = Router();

notesRouter.post("/add/notes", validateToken, addNotes);
notesRouter.get("/get/:id/notes", validateToken, getNotes);
notesRouter.delete("/delete/:id/notes", validateToken, deleteNotes);
notesRouter.patch("/update/:id/notes", validateToken, updateNotes);

export default notesRouter;
