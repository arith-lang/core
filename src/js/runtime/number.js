import {
  isInteger,
  isFloat,
  isReal,
  isRational,
  isComplex,
} from "../shared/number-matchers.js";
import { isIntWithinBounds } from "../shared/utils.js";
import math from "../shared/math.js";

export const makeNumber = (str) => {
  if (isInteger(str)) {
    return isIntWithinBounds(Number(str)) ? Number(str) : BigInt(str);
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

export const isNumber = (obj) =>
  typeof obj === "number" ||
  typeof obj === "bigint" ||
  math.isBigNumber(obj) ||
  math.isFraction(obj) ||
  math.isComplex(obj);
