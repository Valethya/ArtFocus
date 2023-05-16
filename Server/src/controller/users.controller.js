// import userManager from "../dao/MongoManager/users.mongoManager.js";
import passport from "passport";
import customRouter from "../custom/router.custom.js";
import {
  createUser,
  findUserByEmail,
  updateUser,
} from "../service/users.service.js";
import handleErrorPassport from "../middleware/handleErrorPassport.js";
import generateUrl from "../mailing/generateUrl.mailing.js";
import transport from "../utils/gmail.util.js";
import emailResetPassword from "../mailing/resetPassword.js";
import { serialize } from "cookie";
import handleResponse from "../middleware/handleResponse.js";
import { verifyToken } from "../utils/jwt.utils.js";
import { comparePassword } from "../service/users.service.js";
import loggerFactory from "../factories/logger.factories.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import cript from "../utils/criptPassword.utils.js";
const logger = await loggerFactory.getLogger();

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
      handleErrorPassport("register"),
      asyncWrapper(async (req, res, next) => {
        handleResponse(res, "usuario registrado exitosamente", 200);
      })
    );

    this.get("/failRegister", ["PUBLIC"], async (req, res) => {
      res.json({ error: "Falló" });
    });

    this.post(
      "/premium/:uid",
      ["PUBLIC"],
      asyncWrapper(async (req, res, next) => {
        const email = req.params.uid;

        const user = await findUserByEmail(email);

        const role = user.role == "user" ? "premium" : "user";
        const options = {
          role,
        };
        console.log(user.role, "rol");
        const updatedUser = await updateUser(user.id, options);
        handleResponse(res, `Ahora eres ${role}`, 200);
      })
    );

    this.post(
      "/password/reset/Request",
      ["PUBLIC"],
      asyncWrapper(async (req, res, next) => {
        const { email } = req.body;
        await findUserByEmail(email);
        const link = await generateUrl(email);
        logger.default.info(link.url);
        const response = await transport.sendMail({
          from: "mailingartfocus@gmail.com",
          to: email,
          subject: "restablecer contraseña",
          html: emailResetPassword(link.url),
          attachments: [],
        });

        const cookieValue = serialize("resetPassword", link.token, {
          maxAge: 60 * 60,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        res.setHeader("set-cookie", cookieValue);

        handleResponse(res, response, 200);
      })
    );

    this.put(
      "/password/reset",
      ["PUBLIC"],
      asyncWrapper(async (req, res, next) => {
        const password = req.body.newPassword;
        const token = req.cookies.resetPassword;
        const decoded = verifyToken(token);
        const email = decoded.email;
        console.log("hola");
        const user = await comparePassword(email, password);
        console.log(password, " user user hola");
        const ops = {
          password: cript.createHash(password),
        };
        const response = await updateUser(user._id, ops);
        handleResponse(res, response, 200);
      })
    );
  }
}

export default User;

//nxooqgsqxfhloycy
