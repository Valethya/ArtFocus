import { verifyPermission } from "../utils/verifyAuth.utils.js";
import { verifyToken } from "../utils/jwt.utils.js";

function handlePolice(policies) {
  return (req, res, next) => {
    const police = {
      PUBLIC: 1,
      USER: 2,
      ADMIN: 3,
    };

    const requiredLevel = police[policies[0]];
    if (requiredLevel === police.PUBLIC) {
      // Acceso público, se permite el acceso sin necesidad de autenticación
      next();
    } else {
      const token = req.cookies.authToken;
      if (!token) {
        const error = {
          code: 401,
          message: "No se proporcionó el token de autenticación",
        };
        return next(error);
      } else {
        // Verificar si el token es válido y si el usuario tiene los permisos necesarios
        try {
          const user = verifyToken(token);
          const role = user.role.toUpperCase();
          const userLevel = police[role];
          const type = policies[1].toLowerCase();

          verifyPermission(userLevel, requiredLevel, type, next);
        } catch (error) {
          res.status(401).json({ error: "Token inválido" });
          return;
        }
      }
    }
  };
}

export default handlePolice;
