import { port } from "./config/index.config.js";
import { app } from "./index.js";
import { Server } from "socket.io";
import managerFactory from "./factories/manager.factories.js";
import loggerFactory from "./factories/logger.factories.js";

const logger = await loggerFactory.getLogger();

const message = await managerFactory.getManager("message");
const httpServer = app.listen(port, () => {
  logger.default.info(`server running at port ${port}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5173", "http://localhost:8080"],
    methods: ["GET", "POST"],
    // credentials: true,
  },
});

io.on("connection", async (socket) => {
  logger.default.info("nos hemos conectado señores");

  socket.on("message", async (data) => {
    const allMessages = await message.persistFind();

    io.emit("allMessages", allMessages);
  });
});

export default io;
