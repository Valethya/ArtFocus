import { mongoConect } from "../db/index.db.js";
import { persist } from "../config/index.config.js";

class persistFactory {
  static async getPersist(collection) {
    const persists = {
      MONGO: async () => {
        mongoConect();

        return await import(`../dao/mongo/${collection}.mongo.js`);
      },
      FS: async () => {
        return await import(`../dao/fs/${collection}.fs.js`);
      },
    };

    return persists[persist]();
  }
}

export default persistFactory;
