import managerFactory from "../factories/manager.factories.js";
import cript from "../utils/criptPassword.utils.js";
import causeError from "../utils/errors/cause.error.js";
import CustomError from "../utils/errors/custom.error.js";
import { EnumError } from "../utils/errors/enums.errors.js";
import messagesError from "../utils/errors/message.error.js";

const users = await managerFactory.getManager("users");
const cartManager = await managerFactory.getManager("carts");

export default async function createUser(req, username, password) {
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
