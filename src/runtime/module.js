export class Module {
  constructor(name, provides, requires) {
    this.name = name;
    this.provides = provides;
    this.requires = requires;
  }

  toString() {
    return `Module: <${this.name}>`;
  }
}

export function makeModule(name, provides, requires = []) {
  return new Module(name, provides, requires);
}
