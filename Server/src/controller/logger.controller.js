import customRouter from "../custom/router.custom.js";
import asyncWrapper from "../utils/asyncWrapper.js";

class Logger extends customRouter {
  init() {
    this.get(
      "/",
      asyncWrapper(async (res, req, next) => {})
    );
  }
}

export default Logger;
