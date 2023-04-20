import passport from "passport";
import customRouter from "../custom/router.custom.js";

class Session extends customRouter {
  init() {
    this.get("/", ["USER", "SUPERIOR"], (req, res) => {
      res.json("login succesful");
    });
    this.get(
      "/current",
      ["USER", "SUPERIOR"],
      passport.authenticate("current", { session: false }),
      (req, res) => {
        res.json({ payload: req.user });
      }
    );
  }
}
export default Session;
