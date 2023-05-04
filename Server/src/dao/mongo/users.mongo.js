import causeError from "../../utils/errors/cause.error.js";
import CustomError from "../../utils/errors/custom.error.js";
import { EnumError } from "../../utils/errors/enums.errors.js";
import messagesError from "../../utils/errors/message.error.js";
import usersModel from "./models/users.models.js";

class usersManager {
  static #instance;

  static getInstance() {
    return this.#instance ? this.#instance : new usersManager();
  }
  // async create(user) {
  //   try {
  //     const passwordEncrypted = cript.createHash(user.password);
  //     const userHash = {
  //       ...user,
  //       password: passwordEncrypted,
  //     };
  //     const newUser = await usersModel.create(userHash);
  //     return { code: 201, message: "Usuario fue creado", user: newUser };
  //   } catch (error) {
  //     return error.errmsg;
  //   }
  // }
  // async findOne(email, password) {
  //   try {
  //     const user = await usersModel.findOne({ email });
  //     if (!user)
  //       throw new Error({ error: "el usuario y contraseña no coinciden" });
  //     if (user.password !== password)
  //       throw new Error({ error: "el usuario y contraseña no coinciden" });
  //     return user;
  //   } catch (error) {
  //     return error.errmsg;
  //   }
  // }
  // auth(password, email) {
  //   try {
  //     if ("adminCod3r123" !== password) {
  //       throw new Error({ error: "el usuario y contraseña no coinciden" });
  //     }
  //     if ("adminCoder@coder.com" !== email) {
  //       throw new Error({ error: "el usuario y contraseña no coinciden" });
  //     }
  //     const user = { firstName: "adimin", lastName: "", email: email };
  //     return user;
  //   } catch (error) {
  //     return error.errmsg;
  //   }
  // }
  async persistFindUserByEmail(username) {
    try {
      const user = await usersModel.findOne({ email: username });
      if (user) {
        CustomError.createError({
          cause: causeError.USER_ALREADY_EXISTS,
          message: messagesError.USER_ALREADY_EXISTS,
          statusCode: 404,
          code: EnumError.USER_ALREADY_EXISTS,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async persistCreateUser(newUserInfo) {
    try {
      const newUser = await usersModel.create(newUserInfo);

      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

export default usersManager;
