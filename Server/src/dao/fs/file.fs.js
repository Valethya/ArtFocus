class persistFactory {
  static async getPersist(persist, collection) {
    const persists = {
      mongo: await import(`../dao/mongo/${collection}.mongo.js`),
      fs: await import(`../dao/fs/${collection}.fs.js`),
    };
    return persists[persist];
  }
}
