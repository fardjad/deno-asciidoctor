import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const readFileFromPackage = async (filePath) => {
  const fileURL = await import.meta.resolve(filePath);
  return fs.promises.readFile(fileURLToPath(fileURL), { encoding: "utf8" });
};
