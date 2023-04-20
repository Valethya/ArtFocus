class MessageManager {
  static #instance;
  static getInstance() {
    return this.#instance ? this.#instance : new MessageManager();
  }
}
export default MessageManager;
