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
  //     return { status: 201, message: "Usuario fue creado", user: newUser };
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
      console.log("holaaa");
      const user = await usersModel.findOne({ email: username });
      if (user) {
        const error = new Error(`El usuario esta registrado`);
        error.code = 409;
        throw error;
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
