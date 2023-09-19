import { sliceInput } from "../shared/utils.js";

export class Reader {
  /**
   * Constructor
   * @param {import ("../lexer/token").Token[]} tokens
   * @param {import("../shared/diagnostics/diagnostic-bag").DiagnosticBag} diagnostics
   * @param {string} input
   */
  constructor(tokens, diagnostics, input) {
    this.tokens = tokens;
    this.diagnostics = diagnostics;
    this.input = input;
  }

  /**
   * Static constructor
   * @param {import ("../lexer/token").Token[]} tokens
   * @param {import("../shared/diagnostics/diagnostic").Diagnostic} diagnostics
   * @param {string} input
   * @returns {Reader}
   */
  new(tokens, diagnostics, input) {
    return new Reader(tokens, diagnostics, input);
  }

  /**
   *
   * @param {string} msg
   * @param {number} pos
   * @param {import("../lexer/src-loc").SrcLoc} srcloc
   */
  addDiagnostic(msg, pos, srcloc) {
    this.diagnostics.add(msg, sliceInput(this.input, pos), srcloc);
  }
}

export default Reader;
