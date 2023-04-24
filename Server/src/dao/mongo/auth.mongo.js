import usersModel from "./models/users.models.js";

class authManager {
  static #instance;

  static getInstance() {
    return this.#instance ? this.#instance : new authManager();
  }

  async persistLogin(username) {
    try {
      const user = await usersModel.findOne({ email: username });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async persistGithub(newUserInfo) {
    try {
      const newUser = await usersModel.create(newUserInfo);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async persistGoogle(profile) {
    try {
      const newUser = await usersModel.create(newUserInfo);

      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

export default authManager;
