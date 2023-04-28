import persistFactory from "./persist.factories.js";
const ProductsManager = await persistFactory.getPersist("products");
const CartsManager = await persistFactory.getPersist("carts");
const UsersManager = await persistFactory.getPersist("users");
const AuthManager = await persistFactory.getPersist("auth");
const MessageManager = await persistFactory.getPersist("message");
const TicketsManager = await persistFactory.getPersist("tickets");

export default class managerFactory {
  static async getManager(manager) {
    const managers = Object.freeze({
      products: await ProductsManager.default.getInstance(),
      carts: CartsManager.default.getInstance(),
      users: UsersManager.default.getInstance(),
      auth: AuthManager.default.getInstance(),
      message: MessageManager.default.getInstance(),
      ticket: TicketsManager.default.getInstance(),
    });
    return managers[manager];
  }
}
