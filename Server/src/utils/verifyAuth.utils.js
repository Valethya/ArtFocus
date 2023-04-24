export function persmissionExclusive(requiredLevel, userLevel) {
  if (requiredLevel == userLevel) {
    return true;
  } else {
    return false;
  }
}
export function permissionSuperior(requiredLevel, userLevel) {
  if (requiredLevel <= userLevel) return true;
}

export function verifyPermission(requiredLevel, userLevel, type, next) {
  const permissionType = {
    exclusive: (requiredLevel, userLevel) =>
      persmissionExclusive(requiredLevel, userLevel),
    superior: (requiredLevel, userLevel) =>
      permissionSuperior(requiredLevel, userLevel),
  };

  const resultAuth = permissionType[type];

  if (resultAuth(requiredLevel, userLevel)) return next();
  else {
    const error = {
      code: 403,
      message: "No tiene los permisos necesarios",
    };
    return next(error);
  }
}
