import loggerFactory from "../factories/logger.factories.js";

const logger = await loggerFactory.getLogger();

const handleError = (error, req, res, next) => {
  let response = {};

  const statusCode = error.statusCode || 500;
  const messageServer = {
    status: "error",
    code: error.code,
    error: error.cause,
  };
  logger.default.error(JSON.stringify(messageServer));
  if (statusCode == 500) {
    response = {
      status: "error",
      message: "Internal Server Error",
      statusCode: 500,
    };
  } else {
    response = {
      status: "error",
      message: error.message,
      statusCode: statusCode,
    };
  }
  console.log(response, "esto es response");
  return res.status(statusCode).json(response);
};

export default handleError;
