export function persmissionExclusive(requiredLevel, userLevel) {
  console.log(requiredLevel, userLevel, " veamos que esta pasando");
  if (requiredLevel == userLevel) {
    return true;
  } else {
    return false;
  }
}
export function permissionSuperior(requiredLevel, userLevel) {
  if (requiredLevel <= userLevel) return true;
}
