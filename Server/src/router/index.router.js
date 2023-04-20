import routerFactory from "../factories/router.factories.js";

const auth = routerFactory.getRouter("auth");
const views = routerFactory.getRouter("views");
const users = routerFactory.getRouter("users");
const session = routerFactory.getRouter("session");
const products = routerFactory.getRouter("products");
const carts = routerFactory.getRouter("carts");
const chat = routerFactory.getRouter("chat");

const router = (app) => {
  app.use("/api/products", products);
  app.use("/api/carts", carts);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/", views);
  app.use("/session", session);
  app.use("/api/chats", chat);
  app.use("/*", (req, res) => {
    res.status(404).json({ error: "algo estas haciendo mal" });
  });
};

export default router;

// import carts from "../controller/carts.controller.js";
// import products from "../controller/products.controller.js";
// import User from "../controller/users.controller.js";
// import Auth from "../controller/auth.controller.js";
// import Views from "../controller/views.controller.js";
// import Session from "../controller/session.controller.js";

// const users = new User().getRouter();
// const auth = new Auth().getRouter();
// const views = new Views().getRouter();
// const session = new Session().getRouter();
