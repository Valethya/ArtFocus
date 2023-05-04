import customRouter from "../custom/router.custom.js";
import loggerFactory from "../factories/logger.factories.js";
import handleResponse from "../middleware/handleResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";
const logger = await loggerFactory.getLogger();

class Logger extends customRouter {
  init() {
    this.get(
      "/",
      ["PUBLIC"],
      asyncWrapper(async (req, res, next) => {
        logger.default.fatal("This is a fatal log");
        logger.default.error("This is an error log");
        logger.default.warn("This is a warning log");
        logger.default.info("This is an info log");
        logger.default.http("This is an HTTP log");
        logger.default.debug("This is a debug log");
        handleResponse(res, "excelente, todo funciona bien", 200);
      })
    );
  }
}

export default Logger;
