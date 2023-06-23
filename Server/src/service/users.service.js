import managerFactory from "../factories/manager.factories.js";
import cript from "../utils/criptPassword.utils.js";
import causeError from "../utils/errors/cause.error.js";
import CustomError from "../utils/errors/custom.error.js";
import { EnumError } from "../utils/errors/enums.errors.js";
import messagesError from "../utils/errors/message.error.js";
import { deleteManyFiles, deleteOneFile } from "../utils/fs.utils.js";
import __dirname from "../utils/util.js";

const users = await managerFactory.getManager("users");
const cartManager = await managerFactory.getManager("carts");
async function findUsers() {
  try {
    const result = await users.persistFindUsers();
    return result;
  } catch (error) {}
}
async function register(req, password, username) {
  try {
    const userFound = await users.persistFindUserByEmail(username);
    if (userFound) {
      CustomError.createError({
        cause: causeError.USER_ALREADY_EXISTS,
        message: messagesError.USER_ALREADY_EXISTS,
        statusCode: 404,
        code: EnumError.USER_ALREADY_EXISTS,
      });
    }
    const user = await createUser(req, password);
    return user;
  } catch (error) {
    throw error;
  }
}
async function createUser(req, password) {
  const { firstName, lastName, email, age } = req.body;
  try {
    if (!email) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_EMAIL,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    if (!firstName) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_NAME,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    if (!lastName) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_LAST_NAME,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    if (!age) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_AGE,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    if (!password) {
      CustomError.createError({
        cause: causeError.REQUIRED_FIELDS,
        message: messagesError.REQUIRED_PASSWORD,
        statusCode: 404,
        code: EnumError.INCOMPLET_FIELDS,
      });
    }
    const cart = await cartManager.persistCreate();
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
    throw error;
  }
}
async function findUserByEmail(email) {
  try {
    console.log(email);
    const user = await users.persistFindUserByEmail(email);
    if (!user) {
      CustomError.createError({
        cause: causeError.EMAIL_NOT_FOUND,
        message: messagesError.EMAIL_NOT_FOUND,
        statusCode: 404,
        code: EnumError.EMAIL_NOT_FOUND,
      });
    }
    return user;
  } catch (error) {
    throw error;
  }
}
async function updateUser(id, ops) {
  try {
    await users.persistUpdateUser(id, ops);
    return "Actualizacion exitosa";
  } catch (error) {
    throw error;
  }
}
async function deleteUser(id) {
  try {
    await users.persistDeleteUser(id);
  } catch (error) {
    throw error;
  }
}
async function comparePassword(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (!cript.isValidPassword(user, password)) {
      return user;
    }
    CustomError.createError({
      cause: causeError.PASSWORD_SAME_AS_CURRENT,
      message: messagesError.PASSWORD_SAME_AS_CURRENT,
      statusCode: 400,
      code: EnumError.PASSWORD_SAME_AS_CURRENT,
    });
    return "La nueva contraseña, no debe coincidir con las ultimas 3 contraseñas usadas";
  } catch (error) {
    throw error;
  }
}
async function changeRole(req) {
  try {
    const email = req.params.uid;
    let role;
    const user = await findUserByEmail(email);
    if (user.role === "premium") {
      const options = {
        role: "user",
      };
      return { options, uid: user.id, user: user };
    }
    if (user.document == 0) {
      CustomError.createError({
        cause: "no se han subido todos los documentos",
        message: "porfavor suba todos los documentos",
        code: 400,
      });
    }
    role = "premium";
    const options = {
      role,
    };
    return { options, uid: user.id };
  } catch (error) {}
}
async function upDocument(req) {
  try {
    const email = req.params.uid;
    const upDoc = req.files;
    const user = await findUserByEmail(email);
    const documents = user.document;
    if (documents.length == 3) {
      deleteManyFiles(upDoc);
      return "ya cuentas con todos los documentos";
    }
    if (documents.length < 3) {
      for (const doc in upDoc) {
        if (upDoc[doc]) {
          const nameFile = upDoc[doc][0];
          console.log(nameFile);
          documents.push({
            name: `${nameFile.fieldname}`,
            reference: `/documents/${nameFile.filename}`,
          });
        } else {
          throw `Debe subir toda la documentacion requerida`;
        }
      }
    }
    const ops = { document: documents };
    await users.persistUpdateUser(user._id, ops);

    return "Documentacion cargada exitosamente";
  } catch (error) {}
}
async function updateThumbnail(req) {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);
    const thumbnail = user.thumbnail;
    const img = `/img/profile/${req.file.filename}`;

    if (!thumbnail.includes(img)) {
      thumbnail.push(img);
    }
    const ops = { thumbnail };
    const result = await users.persistUpdateUser(user._id, ops);
    if (result.modifiedCount == 0) {
      deleteOneFile(ops.thumbnail);
    }

    return "Foto de perfil actualizada";
  } catch (error) {}
}
async function findUser(id) {
  try {
    const user = await users.persistFindUser(id);
    return user;
  } catch (error) {}
}

const deleteUserInactive = async () => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const findUser = await users.persistFindUsers(
      { lastConnection: { $lt: twoDaysAgo } },
      { email: 1 }
    );
    const deletedUser = findUser.map((user) => user.email);
    const result = await users.persistDeleteUserInactive({
      lastConnection: { $lt: twoDaysAgo },
    });
    if (result.deletedCount > 0) {
      await sendDeletionNotification(deletedUser);
    }
    return `${result.deletedCount} usuarios eliminados.`;
  } catch (error) {
    console.error("Error al eliminar usuarios:", error);
  }
};
async function sendDeletionNotification(emails) {
  try {
    await transport.sendMail({
      from: "mailingartfocus@gmail.com",
      to: emails,
      subject: "Cuenta eliminada por inactividad",
      html: "Tu cuenta ha sido eliminada debido a la inactividad.",
      attachments: [],
    });

    return "Notificaciones enviadas a los usuarios eliminados.";
  } catch (error) {
    throw ("Error al enviar notificaciones:", error);
  }
}
export {
  findUserByEmail,
  findUser,
  createUser,
  comparePassword,
  register,
  updateUser,
  deleteUser,
  changeRole,
  upDocument,
  updateThumbnail,
  findUsers,
  deleteUserInactive,
  sendDeletionNotification,
};
