export class Module {
  /**
   * Module constructor
   * @param {string} name
   * @param {Object} provides
   * @param {string[]} dependencies
   * @param {string} file
   */
  constructor(name, provides, dependencies, file) {
    this.name = name;
    this.provides = provides;
    this.dependencies = dependencies;
    this.file = file;
  }

  /**
   * Module static constructor
   * @param {string} name
   * @param {Object} provides
   * @param {string[]} dependencies
   * @param {string} file
   * @returns {Module}
   */
  static new(name, provides, dependencies, file) {
    return new Module(name, provides, dependencies, file);
  }
}
