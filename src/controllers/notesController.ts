import { Request, Response } from "express";
import client from "../database/postgres.js";
import dotenv from "dotenv";

dotenv.config();

export async function addNotes(req: Request, res: Response) {
  const { title, description, date, time, folderId } = req.body;
  const { userId } = res.locals.userSession;

  try {
    await client.notes.create({
      data: { title, description, date, time, userId, folderId },
    });
    const notes = await client.notes.findMany({ where: { userId, folderId } });
    console.log(notes);
    res.status(201).send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getNotes(req: Request, res: Response) {
  const { userId } = res.locals.userSession;
  const folderId = Number(req.params.id);

  try {
    const notes = await client.notes.findMany({
      where: { userId, folderId },
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

export async function updateNotes(req: Request, res: Response) {
  const { title, description, date, time, folderId } = req.body;
  const noteId = Number(req.params.id);
  const { userId } = res.locals.userSession;

  try {
    await client.notes.update({
      where: { id: noteId },
      data: { title, description, date, time },
    });
    const notes = await client.notes.findMany({ where: { userId, folderId } });
    console.log(notes);
    res.status(200).send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
}
