import { fileURLToPath } from "url";

export const ROOT_URL = import.meta.url.replace("root.js", "");
export const ROOT_PATH = fileURLToPath(ROOT_URL);
