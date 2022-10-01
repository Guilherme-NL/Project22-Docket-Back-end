import {
  handleGoogleUser,
  registerNewUser,
  userLogin,
  userLogout,
} from "../services/authService.js";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export async function signup(req: Request, res: Response) {
  const { name, email, image, password } = req.body;
  console.log(req.body);

  try {
    await registerNewUser(name, email, image, password);
    res.sendStatus(201);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const body = await userLogin(email, password);

    res.status(200).send(body);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}

export async function logout(req: Request, res: Response) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    await userLogout(token);
    res.sendStatus(200);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}

export async function googleLogin(req: Request, res: Response) {
  const { token } = req.body;

  try {
    const { name, picture } = await handleGoogleUser(token);
    res.status(200).send({ name, image: picture, token });
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}
