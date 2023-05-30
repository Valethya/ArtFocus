import passport from "passport";
import customRouter from "../custom/router.custom.js";
import InfoDto from "../DTO/infoUser.dto.js";
import handleErrorPassport from "../middleware/handleErrorPassport.js";
import handleResponse from "../middleware/handleResponse.js";
import loggerFactory from "../factories/logger.factories.js";
import asyncWrapper from "../utils/asyncWrapper.js";
const logger = loggerFactory.getLogger();
class Session extends customRouter {
  init() {
    // this.get("/", ["USER", "SUPERIOR"], (req, res) => {
    //   res.json("login succesful");
    // });
    this.get(
      "/current",
      /*["USER", "SUPERIOR"]*/ ["PUBLIC"],
      handleErrorPassport("current"),
      asyncWrapper((req, res) => {
        const response = new InfoDto(req.user);

        handleResponse(res, response, 200);
      })
    );
  }
}
export default Session;
