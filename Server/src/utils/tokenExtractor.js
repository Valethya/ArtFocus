export const tokenExtractor = (req) => {
  let token = null;
  const tokenHeaders = req.headers.authorization;
  const tokenCookie = req.cookies.authToken;
  if (tokenHeaders) {
    console.log("hola");
    token = tokenHeaders;
  }
  if (tokenCookie) {
    console.log("vergas");
    token = tokenCookie;
  }
  return token;
};
