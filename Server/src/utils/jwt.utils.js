import jwt from "jsonwebtoken";
import { secretKey } from "../config/index.config.js";

export const generateToken = (user) => {
  const token = jwt.sign({ ...user }, secretKey, {
    expiresIn: "180s",
  });
  console.log(token, " generado");
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

export const authTokenCookie = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "not authenticated" });

  jwt.verify(token, secretKey, (error, Credential) => {
    if (error) return res.status(403).json({ error: "not authorized" });

    req.user = Credential;
    next();
  });
};
