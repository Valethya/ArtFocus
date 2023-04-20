import bcrypt from "bcrypt";

const createHash = (password) => {
  // Se genera una "salt" (cadena aleatoria) para mejorar la seguridad del hash, con un costo de "10"
  const salt = bcrypt.genSaltSync(10);
  // Se encripta el "password" recibido usando la "salt" generada anteriormente
  const passEncrypted = bcrypt.hashSync(password, salt);

  return passEncrypted;
};

const isValidPassword = (user, password) => {
  const response = bcrypt.compareSync(password, user.password);

  return response;
};

export default { createHash, isValidPassword };
