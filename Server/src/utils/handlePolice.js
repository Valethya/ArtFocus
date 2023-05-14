import causeError from "./errors/cause.error.js";
import CustomError from "./errors/custom.error.js";
import { EnumError } from "./errors/enums.errors.js";
import messagesError from "./errors/message.error.js";
import { verifyToken } from "./jwt.utils.js";

function handlePolice(policies) {
  return (req, res, next) => {
    try {
      if ("PUBLIC" == policies) {
        return next();
      }
      const token = req.cookies.authToken;
      if (!token) {
        CustomError.createError({
          cause: causeError.NOT_AUTHENTICATED,
          message: messagesError.NOT_AUTHENTICATED,
          statusCode: 403,
          code: EnumError.NOT_AUTHENTICATED,
        });
      }

      const user = verifyToken(token);
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
