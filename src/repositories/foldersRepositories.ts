import client from "../database/postgres.js";

export async function findFolderName(name: string) {
  const folder = await client.folders.findFirst({ where: { name } });
  return folder;
}

export async function createFolder(name: string, userId: number) {
  await client.folders.create({
    data: { name, userId },
  });
}

export async function findFolders(userId: number) {
  const folders = await client.folders.findMany({
    where: { userId },
  });
  return folders;
}

export async function deleteFolderById(id: number) {
  await client.folders.delete({
    where: { id },
  });
}

export async function findFolderById(id: number) {
  const folder = await client.folders.findFirst({ where: { id } });
  return folder;
}
