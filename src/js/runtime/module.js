export class Module {
  constructor(name, members, requires, nativeRequires) {
    this.name = name;
    this.members = members;
    this.requires = requires;
    this.nativeRequires = nativeRequires;
  }

  toString() {
    return `Module: <${this.name}>`;
  }
}

export function makeModule(name, members, requires, nativeRequires) {
  return new Module(name, members, requires, nativeRequires);
}
