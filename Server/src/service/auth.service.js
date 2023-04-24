import usersModel from "../dao/mongo/models/users.models.js";
import cript from "../utils/criptPassword.utils.js";
import { emailAdmin, passAdmin } from "../config/index.config.js";

import managerFactory from "../factories/manager.factories.js";

const auth = await managerFactory.getManager("auth");
const cartManager = await managerFactory.getManager("carts");

//
async function authLogin(username, password) {
  try {
    try {
      const admin = validAdmin(username, password);
      if (admin) {
        return admin;
      }
    } catch (error) {
      // Ignoramos las excepciones arrojadas por validAdmin()
    }
    const user = await auth.persistLogin(username);

    if (!user) {
      const error = new Error("credenciales no coinciden");
      error.code = 404;
      throw error;
    }

    if (!cript.isValidPassword(user, password)) {
      const error = new Error("credenciales no coinciden");
      error.code = 404;
      throw error;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

function validAdmin(username, password) {
  if (username == emailAdmin) {
    if (password == passAdmin) {
      const user = {
        firstName: "admin",
        email: username,
        role: "admin",
        id: "123456789101",
      };
      return user;
    } else {
      return false;
    }
  }
}

async function authGithub(profile) {
  try {
    const foundUser = await usersModel.findOne({ githubId: profile._json.id });

    if (!foundUser) {
      const cart = await cartManager.create();

      const newUserInfo = {
        githubId: profile._json.id,
        firstName: profile._json.name
          ? profile._json.name
          : profile._json.login,
        lastName: "",
        age: 18,
        email: profile._json.email ? profile._json.email : "",
        password: "",
        cart,
      };

      const newUser = await auth.persistGithub(newUserInfo);
      return newUser;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function authGoogle(profile) {
  try {
    const user = await usersModel.findOne({ googleId: profile._json.sub });

    if (!user) {
      const cart = await cartManager.create();
      const newUserInfo = {
        googleId: profile._json.sub,
        firstName: profile._json.given_name ? profile._json.given_name : "",
        lastName: profile._json.family_name ? profile._json.family_name : "",
        age: 18,
        email: profile._json.email ? profile._json.email : "",
        password: "",
        cart,
      };

      const newUser = await auth.persistGoogle(newUserInfo);

      return newUser;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export { authLogin, authGithub, authGoogle };

// import authManager from "../dao/mongo/auth.mongo.js";
// import cartsManager from "../dao/mongo/carts.mongo.js";

// const auth = authManager.getInstance();
// const cartManager = cartsManager.getInstance();
