import { AssertionException } from "../shared/exceptions.js";
import { isKeyword } from "./keyword.js";
import { isNumber } from "./number.js";

export const assertIsNumber = (obj) => {
  if (!isNumber(obj)) {
    throw new AssertionException("number", typeof obj);
  }
};

export const assertIsString = (obj) => {
  if (typeof obj !== "string") {
    throw new AssertionException("string", typeof obj);
  }
};

export const assertIsBoolean = (obj) => {
  if (typeof obj !== "boolean") {
    throw new AssertionException("boolean", typeof obj);
  }
};

export const assertIsNil = (obj) => {
  if (obj != null) {
    throw new AssertionException("nil", typeof obj);
  }
};

export const assertIsKeyword = (obj) => {
  if (!isKeyword(obj)) {
    throw new AssertionException("keyword", typeof obj);
  }
};
