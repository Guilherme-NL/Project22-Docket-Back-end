import { Request, Response } from "express";
import client from "../database/postgres.js";
import dotenv from "dotenv";

dotenv.config();

export async function addFolder(req: Request, res: Response) {
  const { name } = req.body;
  const { userId } = res.locals.userSession;

  try {
    await client.folders.create({
      data: { name, userId },
    });
    const folders = await client.folders.findMany({
      where: { userId },
    });
    res.status(201).send(folders);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getFolder(req: Request, res: Response) {
  const { userId } = res.locals.userSession;

  try {
    const notes = await client.folders.findMany({
      where: { userId },
    });
    res.status(200).send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function deleteFolders(req: Request, res: Response) {
  const { userId } = res.locals.userSession;
  const id = Number(req.params.id);

  try {
    await client.folders.delete({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}
