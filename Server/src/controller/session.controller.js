import passport from "passport";
import customRouter from "../custom/router.custom.js";
import InfoDtoCurrent from "../DTO/userDto.js";
import handleErrorPassport from "../middleware/handleErrorPassport.js";
import handleResponse from "../middleware/handleResponse.js";
import loggerFactory from "../factories/logger.factories.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { tokenExtractor } from "../utils/tokenExtractor.js";
import { verifyToken } from "../utils/jwt.utils.js";
import { findUserByEmail } from "../service/users.service.js";
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
      asyncWrapper(async (req, res) => {
        const token = tokenExtractor(req);
        let response;
        if (token) {
          const decoded = verifyToken(token);
          console.log(decoded.email);
          const user = await findUserByEmail(decoded.email);
          response = new InfoDtoCurrent(user);
        } else {
          response = null;
        }

        handleResponse(res, response, 200);
      })
    );
  }
}
export default Session;
