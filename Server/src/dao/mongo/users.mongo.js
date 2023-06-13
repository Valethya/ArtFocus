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
  async persistFindUser(id) {
    try {
      const user = await usersModel.findById({ _id: id });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async persistFindUserByEmail(username) {
    try {
      const user = await usersModel.findOne({ email: username });
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
  async persistUpdateUser(id, ops) {
    try {
      const result = await usersModel.updateOne({ _id: id }, { $set: ops });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async persistDeleteUser(id) {
    try {
      const result = await usersModel.deleteOne({ _id: pid });
      return result;
    } catch (error) {}
  }
}

export default usersManager;
