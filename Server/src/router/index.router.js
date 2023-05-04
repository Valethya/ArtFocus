import routerFactory from "../factories/router.factories.js";
import CustomError from "../utils/errors/custom.error.js";
import { EnumError } from "../utils/errors/enums.errors.js";
const auth = routerFactory.getRouter("auth");
const views = routerFactory.getRouter("views");
const users = routerFactory.getRouter("users");
const session = routerFactory.getRouter("session");
const products = routerFactory.getRouter("products");
const carts = routerFactory.getRouter("carts");
const chat = routerFactory.getRouter("chat");
const email = routerFactory.getRouter("email");
const message = routerFactory.getRouter("message");
const mocking = routerFactory.getRouter("mocking");
const logger = routerFactory.getRouter("logger");
const router = (app) => {
  app.use("/api/products", products);
  app.use("/api/carts", carts);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/", views);
  app.use("/session", session);
  app.use("/api/chats", chat);
  app.use("/email", email);
  app.use("/api/message", message);
  app.use("/mockingproducts", mocking);
  app.use("/loggerTest", logger);
  app.use("*", (req, res, next) => {
    CustomError.createError({
      cause: `Incorrect path`,
      message: `Requested path ${req.protocol}://${req.get("host")}${
        req.baseUrl
      } not found`,
      statusCode: 404,
      code: EnumError.URL_NOT_fOUND,
    });
    next(error);
  });
};

export default router;
