import { cuid } from "../core/cuid.js";
import { ReferenceException } from "../core/exceptions.js";
import { addMetaField, getKeywordField } from "./object.js";
import { makeKeyword } from "./utils.js";

export class Namespace {
  constructor({ parent = null, initial = null, name = "" } = {}) {
    this.parent = parent;
    this.vars = new Map();
    addMetaField(this, "ns", this);
    addMetaField(this, "id", cuid());
    addMetaField(this, "name", name);

    if (initial) {
      this.addMany(initial);
    }
  }

  addMany(vars) {
    for (let [k, v] of vars instanceof Map ? vars : Object.entries(vars)) {
      k = typeof k === "symbol" ? k : Symbol.for(k);
      this.set(k, this.makeVarObject(v));
    }

    return this;
  }

  // traverses the chain of namespaces
  exists(name) {
    return (
      this.lookup(typeof name === "symbol" ? name : Symbol.for(name)) !== null
    );
  }

  extend(name) {
    return new Namespace({ parent: this, name });
  }

  get(name) {
    name = typeof name === "symbol" ? name : Symbol.for(name);
    const scope = this.lookup(name);

    if (scope) {
      const varObj = scope.vars.get(name);
      return varObj[makeKeyword("value")];
    }

    throw new ReferenceException(name.description);
  }

  // checks only in the current namespace
  has(name) {
    return this.vars.has(typeof name === "symbol" ? name : Symbol.for(name));
  }

  lookup(name) {
    name = typeof name === "symbol" ? name : Symbol.for(name);
    let current = this;

    while (current !== null) {
      if (current.has(name)) {
        return current;
      }
      current = this.parent;
    }

    return null;
  }

  makeVarObject(value) {
    return {
      [makeKeyword("value")]: value,
      [makeKeyword("ns")]: getKeywordField(this, "name"),
      [makeKeyword("id")]: cuid(),
    };
  }

  // same name in other overwrites an existing name
  merge(other) {
    this.addMany(other.vars);
    return this;
  }

  set(name, value) {
    const varObj = this.makeVarObject(value);
    this.vars.set(typeof name === "symbol" ? name : Symbol.for(name), varObj);
  }

  var(name) {
    return this.vars.get(typeof name === "symbol" ? name : Symbol.for(name));
  }
}

export function makeNamespace({ name = "global", initial = null } = {}) {
  return new Namespace({ initial, name });
}
