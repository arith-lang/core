import { AssertionException } from "../shared/exceptions.js";
import { isNumber } from "./number.js";

export const assertIsNumber = (obj) => {
  if (!isNumber(obj)) {
    throw new AssertionException("number", typeof obj);
  }
};
