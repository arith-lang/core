/**
 * Holds bindings and their values
 */
export class Environment {
  constructor({ parent = null, name = "Global" }) {
    this.parent = parent;
    this.name = name;
    /** @type {Map<string, any>} */
    this.vars = new Map();
  }

  get(name) {
    const scope = this.lookup(name);

    if (scope) {
      return scope.vars.get(name);
    }

    throw new Error(`Name ${name} not found in the current environment`);
  }

  has(name) {
    return this.vars.has(name);
  }

  lookup(name) {
    let scope = this;

    while (scope) {
      if (scope.has(name)) {
        return scope;
      }

      scope = this.parent;
    }
  }

  set(name, value) {
    this.vars.set(name, value);
  }
}

export default Environment;
