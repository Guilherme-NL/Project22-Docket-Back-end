import { Request, Response } from "express";
import client from "../database/postgres.js";
import dotenv from "dotenv";

dotenv.config();

export async function addNotes(req: Request, res: Response) {
  const { title, description, date, time } = req.body;
  const { userId } = res.locals.userSession;

  try {
    await client.notes.create({
      data: { title, description, date, time, userId },
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getNotes(req: Request, res: Response) {
  const { userId } = res.locals.userSession;

  try {
    const notes = await client.notes.findMany({
      where: { userId },
    });
    res.status(200).send(notes);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function deleteNotes(req: Request, res: Response) {
  const { userId } = res.locals.userSession;
  const id = Number(req.params.id);

  try {
    await client.notes.delete({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}
