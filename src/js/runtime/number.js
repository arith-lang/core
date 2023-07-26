import {
  isInteger,
  isFloat,
  isReal,
  isRational,
  isComplex,
} from "../shared/number-matchers.js";
import { isIntWithinBounds } from "../shared/utils.js";
import math from "./internal/_math.js";

export const makeNumber = (str) => {
  if (isInteger(str)) {
    if (isIntWithinBounds(Number(str))) {
      return Number(str);
    }

    return BigInt(str);
  }

  if (isFloat(str)) {
    // hack off the f at the end and return a Number
    return Number(str.slice(0, -1));
  }

  if (isReal(str)) {
    return math.bignumber(str);
  }

  if (isRational(str)) {
    return math.fraction(str);
  }

  if (isComplex(str)) {
    return math.complex(str);
  }

  // should never get here
  return Number(str);
};
