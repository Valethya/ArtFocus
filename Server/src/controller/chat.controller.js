import customRouter from "../custom/router.custom.js";

class Chat extends customRouter {
  init() {
    this.get("/", async (req, res) => {
      res.render("chat.handlebars", {
        style: "chat.css",
      });
    });
  }
}

export default Chat;
