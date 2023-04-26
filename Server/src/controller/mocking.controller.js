import customRouter from "../custom/router.custom.js";
import handleResponse from "../middleware/handleResponse.js";
import generateProducts from "../utils/mock.utils.js";

class Mocking extends customRouter {
  init() {
    this.get("/", ["PUBLIC"], (req, res, next) => {
      console.log("hola");
      try {
        const response = generateProducts();
        handleResponse(res, response, 200);
      } catch (error) {
        next(error);
      }
    });
  }
}
export default Mocking;
