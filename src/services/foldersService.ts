import {
  createFolder,
  deleteFolderById,
  findFolderById,
  findFolderName,
  findFolders,
} from "../repositories/foldersRepositories.js";
import { deleteNotesByFolderId } from "../repositories/notesRepositories.js";
import { conflictError, unauthorizedError } from "../utils/errorUtils.js";

async function createNewFolder(name: string, userId: number) {
  await validateFolderName(name);
  await createFolder(name, userId);
  const folders = await findFolders(userId);
  return folders;
}

async function validateFolderName(name: string) {
  const folder = await findFolderName(name);
  if (folder) throw conflictError("Folder name must be unique");
}

async function getAllFolders(userId: number) {
  const folders = await findFolders(userId);
  return folders;
}

async function removeFolder(id: number, userId: number) {
  await validateFolder(id, userId);
  await deleteNotesByFolderId(id);
  await deleteFolderById(id);
}

async function validateFolder(id: number, userId: number) {
  const folder = await findFolderById(id);
  if (folder.userId !== userId)
    throw unauthorizedError("the folder belongs to another user!");
}

export { createNewFolder, getAllFolders, removeFolder };
