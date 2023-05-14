import customRouter from "../custom/router.custom.js";
import { create, deleteMessage, find } from "../service/message.service.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import handleResponse from "../middleware/handleResponse.js";

class Message extends customRouter {
  init() {
    this.get(
      "/",
      ["USER", "PREMIUM", "ADMIN"],
      asyncWrapper(async (req, res, next) => {
        const response = await find();

        handleResponse(res, response, 200);
      })
    );

    this.post(
      "/",
      ["USER", "PREMIUM"],
      asyncWrapper(async (req, res) => {
        const { userEmail, userMessage } = req.body;
        const dataMessage = {
          user: userEmail,
          message: userMessage,
        };

        const response = await create(dataMessage);

        handleResponse(res, response, 201);
      })
    );

    this.delete(
      "/",
      ["USER", "PREMIUM", "ADMIN"],
      asyncWrapper(async (req, res, next) => {
        const response = await deleteMessage();
        handleResponse(res, response, 200);
      })
    );
  }
}

export default Message;
