import managerFactory from "../factories/manager.factories.js";

const manager = await managerFactory.getManager("message");

async function find() {
  try {
    const message = await manager.persistFind();
    return message;
  } catch (error) {
    throw error;
  }
}

async function create(dataMessage) {
  try {
    await manager.persistCreate(dataMessage);
    return "mensaje creado";
  } catch (error) {
    throw error;
  }
}

async function deleteMessage() {
  try {
    const message = await manager.persistDelete();

    if (message.deletedCount == 0) {
      const error = new Error("no hay productos para borrar");
      error.code = 404;
      throw error;
    }
    return "productos eliminados";
  } catch (error) {
    throw error;
  }
}

export { create, deleteMessage, find };
