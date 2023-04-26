const handleError = (err, req, res, next) => {
  let response = {};
  const status = err.code || 500;

  if (status === 400 || status === 401 || status === 404 || status === 409) {
    response = {
      status: "error",
      message: err.message,
      statusCode: status,
    };
  } else {
    response = {
      status: "error",
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
  return res.status(status).json(response);
  next(err);
};

export default handleError;
