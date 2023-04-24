import Router from "express";
import handlePolice from "../utils/handlePolice.js";

console.log("otra cosa mas me muero");

export default class customRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router._router;
  }
  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      handlePolice(policies),
      // this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      handlePolice(policies),
      // this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      handlePolice(policies),
      // this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  patch(path, policies, ...callbacks) {
    this.router.patch(
      path,
      handlePolice(policies),
      // this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      handlePolice(policies),
      // this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].status(500).json({ error });
      }
    });
  }
  // generateCustomResponse(req, res, next) {
  //   res.sendSuccess = ({ payload, code }) =>
  //     res
  //       .status(code)
  //       .json({ status: "success", message: payload, statusCode: code });
  //   res.sendServerError = (error) =>
  //     res
  //       .status(500)
  //       .json({ status: "error", message: "internal server error" });
  //   res.sendUserError = ({ error, code }) =>
  //     res.status(400).json({ status: "error", error, statusCode: code });
  //   next();
  // }
}
