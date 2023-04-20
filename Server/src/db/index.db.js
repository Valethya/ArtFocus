import mongoose from "mongoose";
import { pass } from "../config/index.config.js";

export const mongoUri = `mongodb://BackendCoder:${pass}@ac-iwvbtxh-shard-00-00.fwtrhw6.mongodb.net:27017,ac-iwvbtxh-shard-00-01.fwtrhw6.mongodb.net:27017,ac-iwvbtxh-shard-00-02.fwtrhw6.mongodb.net:27017/?ssl=true&replicaSet=atlas-azcxpo-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

export const mongoConect = () => {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("db conected"))
    .catch((error) => console.error("error", error));
};
