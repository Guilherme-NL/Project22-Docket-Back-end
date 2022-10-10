import client from "../database/postgres.js";

export async function truncate() {
  await client.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
  await client.$executeRaw`TRUNCATE TABLE sessions RESTART IDENTITY CASCADE`;
  await client.$executeRaw`TRUNCATE TABLE notes RESTART IDENTITY CASCADE`;
  await client.$executeRaw`TRUNCATE TABLE folders RESTART IDENTITY CASCADE`;
}
