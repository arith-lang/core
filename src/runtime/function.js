import { makeBoolean, makeNumber, makeString } from "./conversion.js";
import { addMetaField } from "./object.js";

export function makeFunction(
  func,
  name,
  { arity = func.length, variadic = false, url = "" } = {}
) {
  Object.defineProperty(func, "name", {
    value: name,
  });

  addMetaField(func, "name", makeString(name));
  addMetaField(func, "arity", makeNumber(arity));
  addMetaField(func, "variadic", makeBoolean(variadic));
  addMetaField(func, "url", makeString(url));
}
