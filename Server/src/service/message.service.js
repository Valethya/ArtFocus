import messageManager from "./dao/Mongo/message.mongo.js";

const messages = new messageManager();

async function find() {
  try {
    const message = await messages.persistFind();
    return { status: 200, message: message };
  } catch (error) {
    return {
      status: 404,
      message: `no se logro concretar la solicitud por error: ${error}`,
    };
  }
}

async function create(dataMessage) {
  try {
    await messages.persistCreate(dataMessage);
    return { status: 201, message: "mensaje creado" };
  } catch (error) {
    return error;
  }
}

async function deleteMessage() {
  try {
    const message = await messages.persistDelete();

    if (message.deletedCount == 0) {
      throw new Error({
        status: 404,
        message: "no hay productos para borrar",
      });
    }
    return { status: 204, message: "productos eliminados" };
  } catch (error) {
    return error.message;
  }
}

export { create, deleteMessage, find };
