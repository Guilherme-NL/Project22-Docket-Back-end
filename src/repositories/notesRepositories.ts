import client from "../database/postgres.js";

export async function deleteNotesByFolderId(id: number) {
  await client.notes.deleteMany({
    where: { folderId: id },
  });
}

export async function deleteNotesById(id: number) {
  await client.notes.delete({
    where: { id },
  });
}

export async function insertNote(
  title: string,
  description: string,
  date: string,
  time: string,
  folderId: number,
  userId: number
) {
  await client.notes.create({
    data: { title, description, date, time, folderId, userId },
  });
}

export async function findNotes(userId: number, folderId: number) {
  const notes = await client.notes.findMany({ where: { userId, folderId } });
  return notes;
}

export async function findNoteById(id: number) {
  const note = await client.notes.findFirst({ where: { id } });
  return note;
}

export async function updateNoteById(
  title: string,
  description: string,
  date: string,
  time: string,
  noteId: number
) {
  await client.notes.update({
    where: { id: noteId },
    data: { title, description, date, time },
  });
}
