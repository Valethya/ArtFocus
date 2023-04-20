import Router from "express";
import { verifyToken } from "../utils/jwt.utils.js";
import {
  persmissionExclusive,
  permissionSuperior,
} from "../utils/verifyAuth.utils.js";

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
      this.handlePolice(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolice(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolice(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  patch(path, policies, ...callbacks) {
    this.router.patch(
      path,
      this.handlePolice(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolice(policies),
      this.generateCustomResponse,
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
  generateCustomResponse(req, res, next) {
    res.sendSuccess = ({ payload, code }) =>
      res
        .status(code)
        .json({ status: "success", message: payload, statusCode: code });
    res.sendServerError = (error) =>
      res
        .status(500)
        .json({ status: "error", message: "internal server error" });
    res.sendUserError = ({ error, code }) =>
      res.status(400).json({ status: "error", error, statusCode: code });
    next();
  }
  // handlePolice(policies) {
  //   return (req, res, next) => {
  //     console.log("desde polices");
  //     if (policies.includes("PUBLIC")) return next();
  //     const authHeader = req.authHeader.authorization;
  //     if (!authHeader)
  //       return res.status(401).json({ error: "not authenticated" });

  //     const token = authHeader.split("")[1];
  //     const user = verifyToken(token);
  //     if (!policies.includes(user.role.toUppercase()))
  //       return res.status(403).json({ error: "not atuhorized" });

  //     req.user = user;
  //     next();
  //   };
  // }

  handlePolice(policies) {
    return (req, res, next) => {
      const police = {
        PUBLIC: 1,
        USER: 2,
        ADMIN: 3,
      };

      const requiredLevel = police[policies[0]];
      if (requiredLevel === 1) {
        // Acceso público, se permite el acceso sin necesidad de autenticación
        next();
      } else {
        // Verificar si el usuario está autenticado
        const token = req.cookies.authToken;

        if (!token) {
          // No se proporcionó el token de autenticación
          res
            .status(401)
            .json({ error: "No se proporcionó el token de autenticación" });
        } else {
          // Verificar si el token es válido y si el usuario tiene los permisos necesarios
          try {
            //verificanfo token
            const user = verifyToken(token);
            //nivil del usuario
            const userLevel = police[user.role.toUpperCase()];
            //typo de authirizacion
            const permissionType = {
              exclusive: (requiredLevel, userLevel) =>
                persmissionExclusive(requiredLevel, userLevel),
              superior: (requiredLevel, userLevel) =>
                permissionSuperior(requiredLevel, userLevel),
            };

            const type = policies[1].toLowerCase();

            const resultAuth = permissionType[type];

            if (resultAuth(requiredLevel, userLevel)) next();
            else {
              res
                .status(403)
                .json({ error: "No tiene los permisos necesarios" });
            }
          } catch (error) {
            // El token es inválido
            res.status(401).json({ error: "Token inválido" });
          }
        }
      }
    };
  }
}
