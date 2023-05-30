import { tokenExtractor } from "./tokenExtractor.js";
import causeError from "./errors/cause.error.js";
import CustomError from "./errors/custom.error.js";
import { EnumError } from "./errors/enums.errors.js";
import messagesError from "./errors/message.error.js";
import { verifyToken } from "./jwt.utils.js";
import { secretKey } from "../config/index.config.js";
import jwt from "jsonwebtoken";
function handlePolice(policies) {
  return (req, res, next) => {
    try {
      if ("PUBLIC" == policies) {
        return next();
      }
      let token = tokenExtractor(req);

      if (!token) {
        CustomError.createError({
          cause: causeError.NOT_AUTHENTICATED,
          message: messagesError.NOT_AUTHENTICATED,
          statusCode: 403,
          code: EnumError.NOT_AUTHENTICATED,
        });
      }
      const user = jwt.verify(token, secretKey);

      const role = user.role.toUpperCase();

      if ([].concat(policies).includes(role)) {
        return next();
      } else {
        CustomError.createError({
          cause: causeError.NOT_AUTHORIZED,
          message: messagesError.NOT_AUTHORIZED,
          statusCode: 401,
          code: EnumError.NOT_AUTHORIZED,
        });
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default handlePolice;
