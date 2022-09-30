import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { userSigninSchema, userSignupSchema } from "../schemas/authSchema.js";
import { signup, signin } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signin", validateSchemaMiddleware(userSigninSchema), signin);
authRouter.post("/signup", validateSchemaMiddleware(userSignupSchema), signup);

export default authRouter;
