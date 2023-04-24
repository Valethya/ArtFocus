import customRouter from "../custom/router.custom.js";
import { create, deleteMessage, find } from "../service/message.service.js";

class Message extends customRouter {
  init() {
    this.get("/", ["USER", "SUPERIOR"], async (req, res, next) => {
      try {
        const response = await find();
        console.log(response, " esto es response");
        handleResponse(res, response, 200);
      } catch (error) {
        next(error);
      }
    });

    this.post("/", ["USER", "SUPERIOR"], async (req, res, next) => {
      try {
        const { userEmail, userMessage } = req.body;
        const dataMessage = {
          user: userEmail,
          message: userMessage,
        };

        const response = await create(dataMessage);

        handleResponse(res, response, 201);
      } catch (error) {
        next(error);
      }
    });

    this.delete("/", ["USER", "SUPERIOR"], async (req, res, next) => {
      try {
        const response = await deleteMessage();
        handleResponse(res, response, 200);
      } catch (error) {
        next(error);
      }
    });
  }
}

export default Message;
