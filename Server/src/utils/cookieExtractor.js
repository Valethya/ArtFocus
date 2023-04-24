export const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies["authToken"]) {
    token = req.cookies["authToken"];

    return token;
  }
  return token;
};
