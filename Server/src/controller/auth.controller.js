import cript from "../utils/criptPassword.utils.js";
import passport from "passport";
import usersModel from "../dao/mongo/models/users.models.js";
import { generateToken } from "../utils/jwt.utils.js";
import customRouter from "../custom/router.custom.js";
import handleResponse from "../middleware/handleResponse.js";
import handleErrorPassport from "../middleware/handleErrorPassport.js";
import { updateUser } from "../service/users.service.js";

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
            cart: req.user.cart?._id || "",
            document: req.user.document,
            lastConnection: req.user.lastConnection || "",
          };
          const options = {
            uid: req.user._id,
            options: {
              lastConnection: new Date(),
            },
          };
          await updateUser(options.uid, options.options);
          const token = generateToken(user, "3600000s");
          res
            .cookie("authToken", token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: "none",
              secure: true,
            })
            .json({
              status: "success",
              data: "session iniciada",
              statusCode: 200,
            });
          // res.json({ message: req.user });
        } catch (error) {
          console.error(error);
          next(error);
        }
      }
    );
    this.get("/logout", ["PUBLIC"], (req, res, next) => {
      res.clearCookie("authToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      handleResponse(res, "Logout exitoso", 200);
    });

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
      passport.authenticate("github"),
      async (req, res, next) => {
        const user = {
          firstName: req.user.firstName,
          email: req.user.email,
          lastName: req.user.lastName || "",
          role: req.user.role,
        };

        const token = generateToken(user, "180000s");

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

        const token = generateToken(user, "180000s");

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
  }
}

export default Auth;
