import messageModels from "./models/message.models.js";

export default class messageManager {
  static #instance;

  static getInstance() {
    return this.#instance ? this.#instance : new messageManager();
  }
  async persistFind() {
    try {
      const message = await messageModels.find();
      return message;
    } catch (error) {
      return {
        status: 404,
        message: `no se logro concretar la solicitud por error: ${error}`,
      };
    }
  }

  async persistCreate(dataMessage) {
    try {
      await messageModels.create(dataMessage);
    } catch (error) {
      return error;
    }
  }

  async persistDelete() {
    try {
      const message = await messageModels.deleteMany();
      return message;
    } catch (error) {
      return error.message;
    }
  }
}
