const messagesError = Object.freeze({
  PRODUCT_NOT_FOUND: "El producto no existe ",
  INVALID_CREDENTIALS: "Las credenciales son invalidas",
  CART_NOT_FOUND: "El carrito no existe",
  REQUIRED_EMAIL: "Se requiere de un email",
  REQUIRED_NAME: "Se requiere de un nombre",
  REQUIRED_LAST_NAME: "Se requiere de un apellido",
  REQUIRED_AGE: "Se requiere de una edad",
  REQUIRED_PASSWORD: "Se requiere de una contraseña",
  USER_ALREADY_EXISTS: "El usuario esta registrado",
  EMAIL_NOT_FOUND: "Este email, no se encuentra registrado",
  NOT_AUTHENTICATED: "No se proporcionó el token de autenticación",
  NOT_AUTHORIZED: "No tienes permisos",
  INVALID_TOKEN: "token invalido",
  PASSWORD_SAME_AS_CURRENT:
    "La nueva contraseña no puede ser igual a la actual",
});
export default messagesError;
