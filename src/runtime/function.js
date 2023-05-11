import { addMetaField } from "./object.js";

export function makeFunction(
  func,
  name,
  { arity = func.length, variadic = false, url = "" } = {}
) {
  Object.defineProperty(func, "name", {
    value: name,
  });

  addMetaField(func, "name", name);
  addMetaField(func, "arity", arity);
  addMetaField(func, "variadic", variadic);
  addMetaField(func, "url", url);
}
