import passport from "passport";
import customRouter from "../custom/router.custom.js";
import InfoDto from "../DTO/infoUser.dto.js";
import handleErrorPassport from "../middleware/handleErrorPassport.js";

class Session extends customRouter {
  init() {
    // this.get("/", ["USER", "SUPERIOR"], (req, res) => {
    //   res.json("login succesful");
    // });
    this.get(
      "/current",
      /*["USER", "SUPERIOR"]*/ ["PUBLIC"],
      handleErrorPassport("current"),
      (req, res) => {
        try {
          const response = new InfoDto(req.user);
          handleResponse(res, response, 200);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
export default Session;
