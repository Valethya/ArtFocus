const handleError = (error, req, res, next) => {
  let response = {};

  const statusCode = error.statusCode || 500;
  const messageServer = {
    status: "error",
    code: error.code,
    error: error.cause,
  };
  console.log(messageServer);

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
  return res.status(statusCode).json(response);
  next(err);
};

export default handleError;
