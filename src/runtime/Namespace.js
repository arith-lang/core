import { ReferenceException } from "../core/exceptions";

export class Namespace {
  constructor({ parent = null, initial = null } = {}) {
    this.parent = parent;
    this.vars = new Map();

    if (initial) {
      this.addMany(initial);
    }
  }

  addMany(vars) {
    for (let [k, v] of vars instanceof Map ? vars : Object.entries(vars)) {
      this.vars.set(k, v);
    }

    return this;
  }

  // traverses the chain of namespaces
  exists(name) {
    return this.lookup(name) !== null;
  }

  extend() {
    return new Namespace({ parent: this });
  }

  get(name) {
    const scope = this.lookup(name);

    if (scope) {
      return scope.vars.get(name);
    }

    throw new ReferenceException(name);
  }

  // checks only in the current namespace
  has(name) {
    return this.vars.has(name);
  }

  lookup(name) {
    let current = this;

    while (current !== null) {
      if (current.has(name)) {
        return current;
      }
      current = this.parent;
    }

    return null;
  }

  // same name in other overwrites an existing name
  merge(other) {
    this.addMany(other.vars);
    return this;
  }

  set(name, value) {
    this.vars.set(name, value);
  }

  var(name) {
    const value = this.get(name);
    return { [Symbol.for(":name")]: name, [Symbol.for(":value")]: value };
  }
}

export function makeNamespace(initial = null) {
  return new Namespace({ initial });
}
