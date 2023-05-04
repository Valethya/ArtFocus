// import userManager from "../dao/MongoManager/users.mongoManager.js";
import passport from "passport";
import customRouter from "../custom/router.custom.js";
import createUser from "../service/users.service.js";

// const users = new userManager();

// router.post("/", async (req, res) => {
//   const { firstName, lastName, age, email, password } = req.body;
//   const newUser = {
//     firstName,
//     lastName,
//     age,
//     email,
//     password,
//   };
//   try {
//     const response = await users.create(newUser);
//

//     res.status(201).json({ result: "succes", payload: response });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// });
class User extends customRouter {
  init() {
    this.post(
      "/",
      ["PUBLIC"],
      passport.authenticate(
        "register" /*{ failureRedirect: "/failRegister" }*/
      ),
      async (req, res, next) => {
        try {
          const user = await createUser(req, username, password);
          handleResponse(res, "usuario registrado", 200);
        } catch (error) {
          next(error);
        }
      }
    );

    this.get("/failRegister", ["PUBLIC"], async (req, res) => {
      res.json({ error: "Falló" });
    });
  }
}

export default User;
