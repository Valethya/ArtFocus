import managerFactory from "../factories/manager.factories.js";
import cript from "../utils/criptPassword.utils.js";
import causeError from "../utils/errors/cause.error.js";
import CustomError from "../utils/errors/custom.error.js";
import { EnumError } from "../utils/errors/enums.errors.js";
import messagesError from "../utils/errors/message.error.js";

const users = await managerFactory.getManager("users");
const cartManager = await managerFactory.getManager("carts");
async function register(req, password, username) {
  try {
    const userFound = await users.persistFindUserByEmail(username);
    if (userFound) {
      CustomError.createError({
        cause: causeError.USER_ALREADY_EXISTS,
        message: messagesError.USER_ALREADY_EXISTS,
        statusCode: 404,
        code: EnumError.USER_ALREADY_EXISTS,
      });
    }
    const user = await createUser(req, password);
    return user;
  } catch (error) {
    throw error;
  }
}
async function createUser(req, password) {
  const { firstName, lastName, email, age } = req.body;
  try {
    if (!email) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_EMAIL,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    if (!firstName) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_NAME,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    if (!lastName) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_LAST_NAME,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    if (!age) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_AGE,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    if (!password) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_PASSWORD,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    const cart = await cartManager.persistCreate();
    const newUserInfo = {
      firstName,
      lastName,
      email,
      age,
      password: cript.createHash(password),
      cart,
    };

    const newUser = await users.persistCreateUser(newUserInfo);

    return newUser;
  } catch (error) {
    throw error;
  }
}
async function findUserByEmail(email) {
  try {
    const user = await users.persistFindUserByEmail(email);

    if (!user) {
      CustomError.createError({
        cause: causeError.EMAIL_NOT_FOUND,
        message: messagesError.EMAIL_NOT_FOUND,
        statusCode: 404,
        code: EnumError.EMAIL_NOT_FOUND,
      });
    }
    return user;
  } catch (error) {
    throw error;
  }
}
async function updateUser(id, ops) {
  try {
    await users.persistUpdateUser(id, ops);
    return "Cambio de contraseña exitoso";
  } catch (error) {
    throw error;
  }
}
async function comparePassword(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (!cript.isValidPassword(user, password)) {
      return user;
    }
    CustomError.createError({
      cause: causeError.PASSWORD_SAME_AS_CURRENT,
      message: messagesError.PASSWORD_SAME_AS_CURRENT,
      statusCode: 400,
      code: EnumError.PASSWORD_SAME_AS_CURRENT,
    });
    return "La nueva contraseña, no debe coincidir con las ultimas 3 contraseñas usadas";
  } catch (error) {
    throw error;
  }
}
export { findUserByEmail, createUser, comparePassword, register, updateUser };
