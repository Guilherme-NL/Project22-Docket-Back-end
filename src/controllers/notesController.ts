import { Request, Response } from "express";
import client from "../database/postgres.js";
import dotenv from "dotenv";
import {
  createNewNote,
  getAllNotes,
  notePatch,
  removeNote,
} from "../services/notesService.js";

dotenv.config();

export async function addNotes(req: Request, res: Response) {
  const { title, description, date, time, folderId } = req.body;
  const { userId } = res.locals.userSession;

  const notes = await createNewNote(
    title,
    description,
    date,
    time,
    folderId,
    userId
  );
  res.status(201).send(notes);
}

export async function getNotes(req: Request, res: Response) {
  const { userId } = res.locals.userSession;
  const folderId = Number(req.params.id);

  const notes = await getAllNotes(userId, folderId);
  res.status(200).send(notes);
}

export async function deleteNotes(req: Request, res: Response) {
  const { userId } = res.locals.userSession;
  const id = Number(req.params.id);

  await removeNote(userId, id);
  res.sendStatus(200);
}

export async function updateNotes(req: Request, res: Response) {
  const { title, description, date, time, folderId } = req.body;
  const noteId = Number(req.params.id);
  const { userId } = res.locals.userSession;

  const notes = await notePatch(
    title,
    description,
    date,
    time,
    folderId,
    noteId,
    userId
  );
  res.status(200).send(notes);
}
