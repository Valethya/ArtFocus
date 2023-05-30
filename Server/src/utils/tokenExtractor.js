export const tokenExtractor = (req) => {
  let token = null;

  const tokenHeaders = req.headers.authorization;
  const tokenCookie = req.cookies.authToken;
  if (tokenHeaders) {
    token = tokenHeaders;
  }
  if (tokenCookie) {
    token = tokenCookie;
  }
  return token;
};
