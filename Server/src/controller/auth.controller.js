import cript from "../utils/criptPassword.utils.js";
import passport from "passport";
import usersModel from "../dao/mongo/models/users.models.js";
import { generateToken } from "../utils/jwt.utils.js";
import customRouter from "../custom/router.custom.js";

// this.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await users.findOne(email, password);

//     const data = user ? user : users.auth(password, email);

//     req.session.user = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//     };

//     res.json({ message: "sesion iniciada", user: data });
//   } catch (error) {
//     res.json(error);
//   }
// });
class Auth extends customRouter {
  init() {
    this.get("/infoUser", ["PUBLIC"], (req, res) => {
      try {
        console.log(req.user, " hay o no hay?");
        const { firstName, email } = req.user;
        const user = { firstName, email };
        res.json({ user: user });
      } catch (error) {
        res.json({ message: "no hay una sesion activa" });
      }
    });

    this.get("/logout", (req, res) => {
      req.session.destroy((error) => {
        if (error) return res.json({ error });
        res.redirect("/login");
      });
    });
    //hola
    this.post("/probando", ["PUBLIC"], async (req, res) => {
      res.sendSuccess({ payload: "bien", code: 200 });
    });
    ///PROFE
    this.post(
      "/",
      ["PUBLIC"],
      passport.authenticate("login", { failureRedirect: "auth/failLogin" }),
      async (req, res) => {
        try {
          if (!req.user)
            return res.status(400).json({ error: "Credenciales invalidas" });

          // req.session.user = {
          //   firstName: req.user.firstName,
          //   lastName: req.user.lastName,
          //   age: req.user.age,
          //   email: req.user.email,
          //   role: req.user.role,
          // };
          // console.log(req.session.user, " esto es session");
          const user = {
            firstName: req.user.firstName,
            email: req.user.email,
            lastName: req.user.lastName || "",
            role: req.user.role,
          };

          const token = generateToken(user);

          res
            .cookie("authToken", token, { maxAge: 180000, httpOnly: true })
            .sendSuccess({ payload: "Sesión iniciada", code: 200 });
          // res.json({ message: req.user });
        } catch (error) {
          res.sendError({ error, code: 500 });
        }
      }
    );

    this.get("/failLogin", ["PUBLIC"], (req, res) => {
      res.json({ error: "No se pudo iniciar sesión" });
    });

    this.get(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user: email"] }),
      async (req, res) => {}
    );

    this.get(
      "/githubcallback",
      ["PUBLIC"],
      passport.authenticate("github", { failureRedirect: "/login" }),
      async (req, res) => {
        req.session.user = req.user;
        res.redirect("/products");
      }
    );

    this.get(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["profile"] }),
      async (req, res) => {}
    );

    this.get(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", { failureRedirect: "/login" }),
      async (req, res) => {
        req.session.user = req.user;
        res.redirect("/products");
      }
    );

    this.get("/logout", ["USER", "SUPERIOR"], (req, res) => {
      req.session.destroy((error) => {
        if (error) return res.json({ error });
        res.redirect("/login");
      });
    });

    this.patch("/forgotPassword", ["PUBLIC"], async (req, res) => {
      try {
        const { email, password } = req.body;

        const passwordEncrypted = cript.createHash(password);
        await usersModel.updateOne({ email }, { password: passwordEncrypted });

        res.json({ message: "Contraseña actualizada" });
      } catch (error) {}
    });
  }
}

export default Auth;
