import { makeString, makeVector } from "./conversion.js";
import { addMetaField, getMetaField } from "./object.js";

export function makeVariant(type, variant, data) {
  let v = {};
  addMetaField(v, "type", makeString(type));
  addMetaField(v, "variant", makeString(variant));
  addMetaField(v, "data", data);
  return v;
}

export function makeEnum(
  typeName,
  constructors = [],
  { methods = [], staticMethods = [] } = {}
) {
  if (constructors.length === 0) {
    return function (data) {
      let v = makeVariant(makeString(typeName), makeString(typeName), data);
      for (let method of methods.concat(staticMethods)) {
        v[getMetaField(method, "name")] = method;
      }
    };
  }

  let e = {};
  addMetaField(e, "type", makeString(typeName));
  addMetaField(
    e,
    "constructors",
    makeVector(constructors.map((c) => makeString(c)))
  );

  for (let method of staticMethods) {
    e[getMetaField(method, "name")] = method;
  }

  for (let constructor of constructors) {
    e[constructor] = makeVariantConstructor(typeName, constructor, methods);
  }

  return e;
}

export function makeVariantConstructor(type, variant, methods = []) {
  return function (data) {
    let v = makeVariant(type, variant, data);

    for (let method of methods) {
      v[getMetaField(method, "name")] = method;
    }

    return v;
  };
}

export function unwrap(variant) {
  return getMetaField(variant, "data");
}
