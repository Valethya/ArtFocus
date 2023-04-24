import messageModels from "./models/message.models.js";

class MessageManager {
  static #instance;

  static getInstance() {
    return this.#instance ? this.#instance : new MessageManager();
  }
  async persistFind() {
    try {
      const message = await messageModels.find();
      return message;
    } catch (error) {
      throw error;
    }
  }

  async persistCreate(dataMessage) {
    try {
      await messageModels.create(dataMessage);
    } catch (error) {
      throw error;
    }
  }

  async persistDelete() {
    try {
      const message = await messageModels.deleteMany();
      return message;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageManager;
