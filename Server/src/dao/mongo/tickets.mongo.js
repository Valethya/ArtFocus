import tickectsModels from "./models/tickets.models.js";
class TicketsManager {
  static #instance;
  static getInstance() {
    return this.#instance ? this.#instance : new TicketsManager();
  }
  async persistCreateTicket(dataTicket) {
    try {
      const ticket = tickectsModels.create(dataTicket);
      return ticket;
    } catch (error) {}
  }
}
export default TicketsManager;
