import { generateToken } from "../utils/jwt.utils.js";
async function generateUrl(email) {
  try {
    const token = generateToken({ email }, "1h");
    const url = `http://127.0.0.1:5173/password/reset?token=${token}`;
    return { url, token };
  } catch (error) {
    return error;
  }
}

export default generateUrl;
