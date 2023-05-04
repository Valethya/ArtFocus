import { enviroment } from "../config/index.config.js";

class loggerFactory {
  static async getLogger() {
    const env = Object.freeze({
      prod: async () => {
        return await import(`../logger/prod.logger.js`);
      },
      dev: async () => {
        return await import(`../logger/dev.logger.js`);
      },
    });

    return env[enviroment]();
  }
}

export default loggerFactory;
