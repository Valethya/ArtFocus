import fs from "fs";
import __dirname from "./util.js";
export async function deleteManyFiles(object) {
  for (const doc in object) {
    const nameFile = object[doc][0];
    fs.unlinkSync(__dirname + "./../../Client/public/" + nameFile.path);
  }
}

export async function deleteOneFile(path) {
  fs.unlinkSync(__dirname + "./../../Client/public/" + path);
}
