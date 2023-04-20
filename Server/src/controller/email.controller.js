import customRouter from "../custom/router.custom";

class Email extends customRouter {
  init() {
    this.get("/email", ["PUBLIC"], (req, res) => {});
  }
}
export default Email;
