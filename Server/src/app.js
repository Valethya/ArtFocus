import { port } from "./config/index.config.js";
import { app } from "./index.js";
import { Server } from "socket.io";
import managerFactory from "./factories/manager.factories.js";
import loggerFactory from "./factories/logger.factories.js";
const logger = await loggerFactory.getLogger();

const message = managerFactory.getManager("message");
const httpServer = app.listen(port, () => {
  logger.default.info(`server running at port ${port}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  logger.default.info("nos hemos conectado señores");

  socket.on("message", async (data) => {
    const allMessages = await message.find();

    io.emit("allMessages", allMessages.message);
  });
});

export default io;
