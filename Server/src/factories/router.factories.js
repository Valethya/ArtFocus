import Auth from "../controller/auth.controller.js";
import Session from "../controller/session.controller.js";
import User from "../controller/users.controller.js";
import Views from "../controller/views.controller.js";
import Products from "../controller/products.controller.js";
import Carts from "../controller/carts.controller.js";
import Message from "../controller/message.controller.js";
import Mocking from "../controller/mocking.controller.js";
import Logger from "../controller/logger.controller.js";

export default class routerFactory {
  static getRouter(router) {
    const routers = Object.freeze({
      auth: new Auth().getRouter(),
      views: new Views().getRouter(),
      users: new User().getRouter(),
      session: new Session().getRouter(),
      products: new Products().getRouter(),
      carts: new Carts().getRouter(),
      message: new Message().getRouter(),
      mocking: new Mocking().getRouter(),
      logger: new Logger().getRouter(),
    });
    return routers[router];
  }
}
