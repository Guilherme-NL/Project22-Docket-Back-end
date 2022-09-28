import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/authSchema.js";
import { signup, signin } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signin", validateSchemaMiddleware(userSchema), signin);
authRouter.post("/signup", validateSchemaMiddleware(userSchema), signup);

export default authRouter;
