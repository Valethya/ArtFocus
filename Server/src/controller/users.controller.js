// import userManager from "../dao/MongoManager/users.mongoManager.js";
import passport from "passport";
import customRouter from "../custom/router.custom.js";
import {
  createUser,
  changeRole,
  deleteUser,
  findUserByEmail,
  updateUser,
  upDocument,
  findUser,
} from "../service/users.service.js";
import handleErrorPassport from "../middleware/handleErrorPassport.js";
import generateUrl from "../mailing/generateUrl.mailing.js";
import transport from "../utils/gmail.util.js";
import emailResetPassword from "../mailing/resetPassword.js";
import { serialize } from "cookie";
import handleResponse from "../middleware/handleResponse.js";
import { generateToken, verifyToken } from "../utils/jwt.utils.js";
import { comparePassword } from "../service/users.service.js";
import loggerFactory from "../factories/logger.factories.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import cript from "../utils/criptPassword.utils.js";
import CustomError from "../utils/errors/custom.error.js";
import { uploader } from "../utils/util.js";
import { InfoUserDto } from "../DTO/infoUser.dto.js";
const logger = await loggerFactory.getLogger();

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
        const options = await changeRole(req);
        await updateUser(options.uid, options.options);
        const user = await findUser(options.uid);
        console.log(user);
        const infoUser = new InfoUserDto(user);
        const token = generateToken(infoUser, "3600000s");
        res.cookie("authToken", token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        handleResponse(res, `Ahora eres ${options.options.role}`, 200);
      })
    );
    this.delete(
      "/delete/:uid",
      ["USER", "PREMIUM", "ADMIN"],
      asyncWrapper(async (req, res, next) => {
        const { uid } = req.params;
        const result = await deleteUser(uid);
        console.log(result, " aqui eliminamos uno");
        handleResponse(res, result, 200);
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
        const token = tokenExtractor(req);
        const decoded = verifyToken(token);
        const email = decoded.email;

        const user = await comparePassword(email, password);

        const ops = {
          password: cript.createHash(password),
        };
        const response = await updateUser(user._id, ops);
        handleResponse(res, response, 200);
      })
    );
    this.post(
      "/:uid/document",
      ["USER"],
      uploader("documents").fields([
        { name: "identification" },
        { name: "proofOfResidence" },
        { name: "accountStatementProof" },
      ]),
      asyncWrapper(async (req, res, next) => {
        const response = await upDocument(req);
        handleResponse(res, response, 200);
      })
    );
  }
}

export default User;

//nxooqgsqxfhloycy
