import { sliceInput } from "../shared/utils.js";

/**
 * Manages state for the token reader
 */
export class Reader {
  /**
   * Constructor
   * @param {import ("../lexer/token.js").Token[]} tokens
   * @param {import("../shared/diagnostics/diagnostic-bag.js").DiagnosticBag} diagnostics
   * @param {string} input
   */
  constructor(tokens, diagnostics, input) {
    this.tokens = tokens;
    this.diagnostics = diagnostics;
    this.input = input;
  }

  /**
   * Static constructor
   * @param {import ("../lexer/token.js").Token[]} tokens
   * @param {import("../shared/diagnostics/diagnostic.js").Diagnostic} diagnostics
   * @param {string} input
   * @returns {Reader}
   */
  new(tokens, diagnostics, input) {
    return new Reader(tokens, diagnostics, input);
  }

  get length() {
    return this.tokens.length;
  }

  /**
   *
   * @param {string} msg
   * @param {number} pos
   * @param {import("../lexer/src-loc.js").SrcLoc} srcloc
   */
  addDiagnostic(msg, pos, srcloc) {
    this.diagnostics.add(msg, sliceInput(this.input, pos), srcloc);
  }
}

export default Reader;
