import loggerFactory from "../factories/logger.factories.js";
const logger = await loggerFactory.getLogger();

const addLogger = async (req, res, next) => {
  req.logger = await logger.default;

  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`
  );

  next();
};

export default addLogger;
