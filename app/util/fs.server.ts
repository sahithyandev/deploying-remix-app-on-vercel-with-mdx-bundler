import fs from "fs/promises";

const CONTENT = `${__dirname}/../app/content`;

export const readContentDir = async () => fs.readdir(CONTENT);

export const readContentFile = async (file: string) =>
  fs.readFile(`${CONTENT}/${file}`, "utf-8");
