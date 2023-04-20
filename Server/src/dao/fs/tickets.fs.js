class TicketsManager {
  static #instance;
  static getInstance() {
    return this.#instance ? this.#instance : new TicketsManager();
  }
}
export default TicketsManager;
