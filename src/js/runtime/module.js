export class Module {
  constructor(name, members, requires) {
    this.name = name;
    this.members = members;
    this.requires = requires;
  }

  toString() {
    return `Module: <${this.name}>`;
  }
}

export function makeModule(name, members, requires) {
  return new Module(name, members, requires);
}
