import customRouter from "../custom/router.custom.js";

class Views extends customRouter {
  init() {
    this.get("/", ["PUBLIC"], (req, res) => {
      const token = tokenExtractor(req);
      const user = verifyToken(token);
      res.render("profile.handlebars", { user });
    });

    this.get("/signup", ["PUBLIC"], (req, res) => {
      res.render("signup.handlebars", { style: "signup.css" });
    });

    this.get("/login", ["PUBLIC"], (req, res) => {
      res.render("login.handlebars", { style: "login.css" });
    });
    this.get("/forgotPassword", ["PUBLIC"], (req, res) => {
      res.render("forgotPassword.handlebars");
    });
  }
}
export default Views;
