import { Exception } from "./exceptions.js";

export const fail = (msg) => {
  throw new Exception(msg);
};
