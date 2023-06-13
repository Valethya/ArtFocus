import fs from "fs";
export async function deleteManyFiles(object) {
  for (const doc in object) {
    const nameFile = object[doc][0];
    fs.unlinkSync(nameFile.path);
  }
}

export async function deleteOneFile(path) {
  fs.unlinkSync(path);
}
