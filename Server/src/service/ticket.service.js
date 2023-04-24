import managerFactory from "../factories/manager.factories.js";

const manager = await managerFactory.getManager("ticket");

async function createTicket(datapurchase) {
  try {
    const ticket = manager.persistCreateTicket(datapurchase);
    return ticket;
  } catch (error) {
    throw error;
  }
}

export { createTicket };
