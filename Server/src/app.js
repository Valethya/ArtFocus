import { port, secretKey } from "./config/index.config.js";
import { app } from "./index.js";
import { Server } from "socket.io";
import managerFactory from "./factories/manager.factories.js";

const message = managerFactory.getManager("message");
const httpServer = app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("nos hemos conectado señores");
  socket.on("message", async (data) => {
    const allMessages = await messages.find();

    io.emit("allMessages", allMessages.message);
  });
});

export default io;
