import managerFactory from "../factories/manager.factories.js";

const manager = managerFactory.getManager("ticket");

async function createTicket(datapurchase) {
  const ticket = manager.persistCreateTicket(datapurchase);
  return ticket;
}

export { createTicket };
