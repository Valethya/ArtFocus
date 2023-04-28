class CustomError {
  static createError({ cause, message, code = 0, statusCode }) {
    const error = new Error(message);
    error.cause = cause;
    error.code = code;
    error.statusCode = statusCode;
    throw error;
  }
}

export default CustomError;
