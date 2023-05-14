const causeError = Object.freeze({
  INVALID_ID: "Id invalido",
  ID_NOT_FOUND: "ID does not register",
  EMAIL_NOT_FOUND: "Email no registrado",
  INVALID_PASSWORD: "Contraseña invalida",
  REQUIRED_FIELDS: "Campos incompletos",
  USER_ALREADY_EXISTS: "Email se encuentra registrado",
  NOT_AUTHENTICATED: "No se proporciono el token de autenticacion",
  NOT_AUTHORIZED: "No tienes permisos",
  INVALID_TOKEN: "token invalido",
  PASSWORD_SAME_AS_CURRENT:
    "La contraseña proporcionada es igual a la guardad en la base de datos",
});
export default causeError;
