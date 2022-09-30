import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findEmail,
  findSession,
  deleteSession,
  insertNewUser,
  insertSession,
} from "../repositories/authRepositorie.js";
const { sign } = jwt;
const secretKey = "skljaksdj9983498327453lsldkjf";

async function registerNewUser(
  name: string,
  email: string,
  image: string,
  password: string
) {
  await validateEmailForRegistration(email);
  const passwordCrypt = await getPasswordCrypt(password);
  await insertNewUser(name, email, image, passwordCrypt);
}

async function validateEmailForRegistration(email: string) {
  const bdEmail = await findEmail(email);
  if (bdEmail) {
    throw {
      code: 409,
      message: "This email is already registered in our database!",
    };
  }
}

async function getPasswordCrypt(password: string) {
  const passwordCrypt = bcrypt.hashSync(password, 10);
  return passwordCrypt;
}

async function userLogin(email: string, password: string) {
  const user = await validateEmailForLogin(email);
  await validatePassword(user.password, password);
  const token = await getToken(email, password);
  await insertSession(user.id, token);
  return { name: user.name, image: user.image, token };
}

async function validateEmailForLogin(email: string) {
  const user = await findEmail(email);
  if (!user) {
    throw {
      code: 404,
      message: "This email is not registered in our database!",
    };
  }
  return user;
}

async function validatePassword(passwordCrypt: string, password: string) {
  const comparePassword = bcrypt.compareSync(password, passwordCrypt);

  if (!comparePassword) {
    throw { code: 401, message: "password incorrect" };
  }
  return "password ok!";
}

async function getToken(email: string, password: string) {
  const token = sign(
    {
      email,
      password,
    },
    secretKey,
    {
      expiresIn: "1y",
      subject: "1",
    }
  );
  return token;
}

async function userLogout(token: string) {
  await validateSession(token);
  await deleteUserSession(token);
}

async function validateSession(token: string) {
  const session = await findSession(token);

  if (!session) {
    throw { code: 404, message: "Sessions not found!" };
  }
}

async function deleteUserSession(token: string) {
  await deleteSession(token);
}

export { registerNewUser, userLogin, userLogout };
