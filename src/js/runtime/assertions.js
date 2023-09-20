import { isList as isVector } from "list";
import { Map, Set } from "immutable";
import { isList } from "../shared/cons.js";
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

export const assertIsPair = (obj) => {
  if (obj.constructor?.name !== "Cons") {
    throw new AssertionException(
      "pair",
      obj.constructor?.name ? obj.constructor.name : typeof obj,
    );
  }
};

export const assertIsList = (obj) => {
  if (!isList(obj)) {
    throw new AssertionException(
      "list",
      obj.constructor?.name ? obj.constructor.name : typeof obj,
    );
  }
};

export const assertIsArray = (obj) => {
  if (!Array.isArray(obj)) {
    throw new AssertionException(
      "array",
      obj.constructor?.name ? obj.constructor.name : typeof obj,
    );
  }
};

export const assertIsVector = (obj) => {
  if (!isVector(obj)) {
    throw new AssertionException(
      "vector",
      obj.constructor?.name ? obj.constructor.name : typeof obj,
    );
  }
};

export const assertIsMap = (obj) => {
  if (!Map.isMap(obj)) {
    throw new AssertionException(
      "map",
      obj.constructor?.name ? obj.constructor.name : typeof obj,
    );
  }
};

export const assertIsSet = (obj) => {
  if (!Set.isSet(obj)) {
    throw new AssertionException(
      "set",
      obj.constructor?.name ? obj.constructor.name : typeof obj,
    );
  }
};

export const assertIsSeq = (obj) => {
  if (obj.constructor?.name !== "Sequence") {
    throw new AssertionException(
      "Seq",
      obj.constructor?.name ? obj.constructor.name : typeof obj,
    );
  }
};

export const assertIsObject = (obj) => {
  if (
    typeof obj !== "object" ||
    obj == null ||
    Map.isMap(obj) ||
    Array.isArray(obj) ||
    isList(obj) ||
    isVector(obj) ||
    Set.isSet(obj) ||
    isNumber(obj) ||
    obj.constructor?.name === "Sequence" ||
    obj.constructor?.name === "Cons"
  ) {
    throw new AssertionException("object", "something else"); // FIXME: create getType function that covers in-lang data structures
  }
};
