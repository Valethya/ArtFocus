import customRouter from "../custom/router.custom.js";
import { create, deleteMessage, find } from "../service/message.service.js";
import asyncWrapper from "../utils/asyncWrapper.js";

class Message extends customRouter {
  init() {
    this.get(
      "/",
      ["USER", "SUPERIOR"],
      asyncWrapper(async (req, res, next) => {
        const response = await find();

        handleResponse(res, response, 200);
      })
    );

    this.post(
      "/",
      ["USER", "SUPERIOR"],
      asyncWrapper(async (req, res, next) => {
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
      ["USER", "SUPERIOR"],
      asyncWrapper(async (req, res, next) => {
        const response = await deleteMessage();
        handleResponse(res, response, 200);
      })
    );
  }
}

export default Message;
