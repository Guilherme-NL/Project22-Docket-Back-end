import {
  deleteNotesByFolderId,
  deleteNotesById,
  findNoteById,
  findNotes,
  insertNote,
  updateNoteById,
} from "../repositories/notesRepositories.js";
import { unauthorizedError } from "../utils/errorUtils.js";

async function createNewNote(
  title: string,
  description: string,
  date: string,
  time: string,
  folderId: number,
  userId: number
) {
  await insertNote(title, description, date, time, folderId, userId);
  const notes = await findNotes(userId, folderId);
  return notes;
}

async function getAllNotes(userId: number, folderId: number) {
  const notes = await findNotes(userId, folderId);
  return notes;
}

async function removeNote(userId: number, id: number) {
  await validateNote(id, userId);
  await deleteNotesById(id);
}

async function validateNote(id: number, userId: number) {
  const note = await findNoteById(id);
  if (note.userId !== userId)
    throw unauthorizedError("the note belongs to another user!");
}

async function notePatch(
  title: string,
  description: string,
  date: string,
  time: string,
  folderId: number,
  noteId: number,
  userId: number
) {
  await updateNoteById(title, description, date, time, noteId);
  const notes = await findNotes(userId, folderId);
  return notes;
}

export { createNewNote, getAllNotes, removeNote, notePatch };
