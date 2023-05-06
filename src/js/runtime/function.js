import { addMetaField } from "./object";

export function makeFunction(
  func,
  name,
  { arity = func.length, variadic = false } = {}
) {
  Object.defineProperty(func, "name", {
    writable: true,
    configurable: true,
    value: name,
  });

  addMetaField(func, "name", name);
  addMetaField(func, "arity", arity);
  addMetaField(func, "variadic", variadic);
}
