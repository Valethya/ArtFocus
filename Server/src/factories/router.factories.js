import Auth from "../controller/auth.controller.js";
import Session from "../controller/session.controller.js";
import User from "../controller/users.controller.js";
import Views from "../controller/views.controller.js";
import Products from "../controller/products.controller.js";
import Carts from "../controller/carts.controller.js";
import Chat from "../controller/chat.controller.js";

export default class routerFactory {
  static getRouter(router) {
    const routers = {
      auth: new Auth().getRouter(),
      views: new Views().getRouter(),
      users: new User().getRouter(),
      session: new Session().getRouter(),
      products: new Products().getRouter(),
      carts: new Carts().getRouter(),
      chat: new Chat().getRouter(),
    };
    return routers[router];
  }
}
