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
}

export default DiagnosticBag;
