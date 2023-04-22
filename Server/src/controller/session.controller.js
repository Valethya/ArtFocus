import passport from "passport";
import customRouter from "../custom/router.custom.js";
import InfoDto from "../DTO/infoUser.dto.js";

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
        try {
          const infoUser = new InfoDto(req.user);
          res.json({ payload: infoUser });
        } catch (error) {
          res.json({ message: error.message });
        }
      }
    );
  }
}
export default Session;
