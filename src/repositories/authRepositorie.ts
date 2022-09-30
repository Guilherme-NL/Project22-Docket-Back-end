import client from "../database/postgres.js";

async function findEmail(email: string) {
  const bdEmail = await client.users.findFirst({ where: { email } });
  return bdEmail;
}

async function findSession(token: string) {
  const session = await client.sessions.findFirst({ where: { token } });
  return session;
}

async function deleteSession(token: string) {
  await client.sessions.delete({ where: { token } });
}

async function insertNewUser(
  name: string,
  email: string,
  image: string,
  password: string
) {
  await client.users.create({ data: { email, password, image, name } });
}

async function insertSession(id: number, token: string) {
  await client.sessions.create({ data: { user: { connect: { id } }, token } });
}

export { findEmail, findSession, deleteSession, insertNewUser, insertSession };
