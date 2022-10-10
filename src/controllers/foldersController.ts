import { Request, Response } from "express";
import dotenv from "dotenv";
import {
  createNewFolder,
  getAllFolders,
  removeFolder,
} from "../services/foldersService.js";

dotenv.config();

export async function addFolder(req: Request, res: Response) {
  const { name } = req.body;
  const { userId } = res.locals.userSession;

  const folders = await createNewFolder(name, userId);
  res.status(201).send(folders);
}

export async function getFolders(req: Request, res: Response) {
  const { userId } = res.locals.userSession;

  const folders = await getAllFolders(userId);
  res.status(200).send(folders);
}

export async function deleteFolder(req: Request, res: Response) {
  const { userId } = res.locals.userSession;
  const id = Number(req.params.id);

  await removeFolder(id, userId);
  res.sendStatus(200);
}
