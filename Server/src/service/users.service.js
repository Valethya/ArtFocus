import managerFactory from "../factories/manager.factories.js";
import cript from "../utils/criptPassword.utils.js";

const users = await managerFactory.getManager("users");
const cartManager = await managerFactory.getManager("carts");

export default async function createUser(req, username, password) {
  const { firstName, lastName, email, age } = req.body;
  try {
    if (!email) {
      const error = new Error("ingresa un email");
      error.code = 404;
      throw error;
    }
    if (!firstName) {
      const error = new Error("ingresa tu nombre");
      error.code = 404;
      throw error;
    }
    if (!lastName) {
      const error = new Error("ingresa tu apellido");
      error.code = 404;
      throw error;
    }
    if (!age) {
      const error = new Error("ingresa tu edad");
      error.code = 404;
      throw error;
    }
    if (!password) {
      const error = new Error("ingresa una contraseña");
      error.code = 404;
      throw error;
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
