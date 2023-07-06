import mongoose from "mongoose";
import { urlMongo } from "../config/index.config.js";
import loggerFactory from "../factories/logger.factories.js";

export const mongoUri = urlMongo;
// export const mongoUri = `mongodb://admin:admin@localhost:27017/test`;
mongoose.set("strictQuery", false);

const logger = await loggerFactory.getLogger();

export const mongoConect = () => {
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.default.info("db conected");
    })
    .catch((error) => logger.default.error("error", error));
};
