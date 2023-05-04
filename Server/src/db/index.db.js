import mongoose from "mongoose";
import { pass } from "../config/index.config.js";
import loggerFactory from "../factories/logger.factories.js";

export const mongoUri = `mongodb://BackendCoder:${pass}@ac-iwvbtxh-shard-00-00.fwtrhw6.mongodb.net:27017,ac-iwvbtxh-shard-00-01.fwtrhw6.mongodb.net:27017,ac-iwvbtxh-shard-00-02.fwtrhw6.mongodb.net:27017/?ssl=true&replicaSet=atlas-azcxpo-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

const logger = await loggerFactory.getLogger();

export const mongoConect = () => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      logger.default.info("db conected");
    })
    .catch((error) => logger.default.error("error", error));
};
