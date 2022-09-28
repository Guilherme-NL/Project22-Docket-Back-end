import { registerNewUser, userLogin } from "../services/authService.js";
import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    await registerNewUser(email, password);
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
    const token = await userLogin(email, password);

    res.status(200).send(token);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}
