import managerFactory from "../factories/manager.factories.js";

const users = await managerFactory.getManager("users");
const cartManager = await managerFactory.getManager("carts");

export default async function createUser(req, username, password) {
  const { firstName, lastName, email, age, cart } = req.body;
  try {
    const user = await users.persistFinUserByEmail(username);
    if (user) {
      console.log("Usuario existe");
      return false;
    }
    if (!email) {
      console.log("ingresa un email");
      return false;
    }
    if (!firstName) {
      console.log("ingresa tu nombre");
      return false;
    }
    if (!lastName) {
      console.log("ingresa tu apellido");
      return false;
    }
    if (!age) {
      console.log("ingresa tu edad");
      return false;
    }
    if (!password) {
      console.log("ingresa una contraseña");
      return false;
    }
    const cart = await cartManager.create();
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
    return error;
  }
}

// import cartsManager from "../dao/mongo/carts.mongo.js";
// import usersManager from "../dao/mongo/users.mongo.js";

// const users = usersManager.getInstance();
// const cartManager = cartsManager.getInstance();
