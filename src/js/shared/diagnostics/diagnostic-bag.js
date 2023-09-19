import Diagnostic from "./diagnostic.js";

export class DiagnosticBag {
  /**
   * Constructor
   */
  constructor() {
    /** @type {import("./diagnostic.js").Diagnostic[]} */
    this.diagnostics = [];
  }

  /**
   * Constructs a Bag from another Bag
   * @param {DiagnosticBag} other
   * @returns {DiagnosticBag}
   */
  static from(other) {
    let bag = DiagnosticBag.new();
    bag.diagnostics = bag.diagnostics.concat(other.diagnostics);
    return bag;
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
   * @param {string} msg
   * @param {string} span The text span including the error
   * @param {import("../../lexer/src-loc.js").SrcLoc}
   */
  add(msg, span, srcloc) {
    const diagnostic = Diagnostic.new(msg, span, srcloc);
    this.diagnostics.push(diagnostic);
  }

  isEmpty() {
    return this.length === 0;
  }
}

export default DiagnosticBag;
