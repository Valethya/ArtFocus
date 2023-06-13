import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const storage = (folder) => {
  return multer.diskStorage({
    destination: (res, file, cb) => {
      cb(null, __dirname + `/public/${folder}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });
};

export const uploader = (folder) => {
  return multer({ storage: storage(folder) });
};

export default __dirname;
