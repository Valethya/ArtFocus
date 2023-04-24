import cript from "../utils/criptPassword.utils.js";
import passport from "passport";
import usersModel from "../dao/mongo/models/users.models.js";
import { generateToken } from "../utils/jwt.utils.js";
import customRouter from "../custom/router.custom.js";
import handleResponse from "../middleware/handleResponse.js";
import handleErrorPassport from "../middleware/handleErrorPassport.js";

// this.post("/", async (req, res,next) => {
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
    this.get("/infoUser", ["PUBLIC"], (req, res, next) => {
      try {
        const { firstName, email } = req.user;
        const user = { firstName, email };
        handleResponse(res, user, 200);
      } catch (error) {
        res.json({ message: "no hay una sesion activa" });
      }
    });

    // this.get("/logout", (req, res, next) => {
    //   req.session.destroy((error) => {
    //     if (error) return res.json({ error });
    //     res.redirect("/login");
    //   });
    // });
    //hola
    this.post("/probando", ["PUBLIC"], async (req, res, next) => {
      res.json({ payload: "bien", code: 200 });
    });
    ///PROFE
    this.post(
      "/",
      ["PUBLIC"],
      handleErrorPassport("login"),
      async (req, res, next) => {
        try {
          if (!req.user) {
            const error = new Error("credenciales invalidas");
            error.code = 404;
            throw error;
          }

          const user = {
            firstName: req.user.firstName,
            email: req.user.email,
            lastName: req.user.lastName || "",
            role: req.user.role,
          };

          const token = generateToken(user);

          res
            .cookie("authToken", token, { maxAge: 180000, httpOnly: true })
            .json({ payload: "Sesión iniciada", code: 200 });
          // res.json({ message: req.user });
        } catch (error) {
          next(error);
        }
      }
    );

    this.get("/failLogin", ["PUBLIC"], (req, res, next) => {
      handleResponse(res, "no se puso iniciar sesion", 401);
    });

    this.get(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user: email"] }),
      async (req, res, next) => {}
    );

    this.get(
      "/githubcallback",
      ["PUBLIC"],
      passport.authenticate("github", { failureRedirect: "/login" }),
      async (req, res, next) => {
        const user = {
          firstName: req.user.firstName,
          email: req.user.email,
          lastName: req.user.lastName || "",
          role: req.user.role,
        };

        const token = generateToken(user);

        res
          .cookie("authToken", token, { maxAge: 180000, httpOnly: true })
          .json({ payload: "Sesión iniciada", code: 200 });
        res.redirect("/products");
      }
    );

    this.get(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["profile"] }),
      async (req, res, next) => {}
    );

    this.get(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", { failureRedirect: "/login" }),
      async (req, res, next) => {
        const user = {
          firstName: req.user.firstName,
          email: req.user.email,
          lastName: req.user.lastName || "",
          role: req.user.role,
        };

        const token = generateToken(user);

        res
          .cookie("authToken", token, { maxAge: 180000, httpOnly: true })
          .json({ payload: "Sesión iniciada", code: 200 });
      }
    );

    // this.get("/logout", ["USER", "SUPERIOR"], (req, res, next) => {
    //   req.session.destroy((error) => {
    //     if (error) return res.json({ error });
    //     res.redirect("/login");
    //   });
    // });

    this.patch("/forgotPassword", ["PUBLIC"], async (req, res, next) => {
      try {
        const { email, password } = req.body;

        const passwordEncrypted = cript.createHash(password);
        await usersModel.updateOne({ email }, { password: passwordEncrypted });
        handleResponse(res, "contraseña actualizada", 204);
      } catch (error) {}
    });
  }
}

export default Auth;
