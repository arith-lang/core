import fs from "fs";

export const readUTF8 = (path) => fs.readFileSync(path, { encoding: "utf-8" });

export const writeUTF8 = (path, data) =>
  fs.writeFileSync(path, data, { encoding: "utf-8" });
