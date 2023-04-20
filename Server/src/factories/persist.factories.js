import { mongoConect } from "../db/index.db.js";
import { persist } from "../config/index.config.js";

class persistFactory {
  static async getPersist(collection) {
    const persists = {
      MONGO: async () => {
        mongoConect();
        console.log("persistencia en mongo");

        return await import(`../dao/mongo/${collection}.mongo.js`);
      },
      FS: async () => {
        console.log("persistencia en fs");

        return await import(`../dao/fs/${collection}.fs.js`);
      },
    };
    console.log(persist);
    return persists[persist]();
  }
}

export default persistFactory;
