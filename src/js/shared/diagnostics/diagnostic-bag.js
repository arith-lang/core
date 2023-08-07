export class DiagnosticBag {
  /**
   * Constructor
   */
  constructor() {
    /** @type {import("./diagnostic.js").Diagnostic[]} */
    this.diagnostics = [];
  }

  /**
   * Static constructor
   * @returns {DiagnosticBag}
   */
  static new() {
    return new DiagnosticBag();
  }

  get length() {
    return this.diagnostics.length;
  }

  /**
   * Add a diagnostic to the bag
   * @param {import("./diagnostic.js").Diagnostic} diagnostic
   */
  add(diagnostic) {
    this.diagnostics.push(diagnostic);
  }
}

export default DiagnosticBag;
