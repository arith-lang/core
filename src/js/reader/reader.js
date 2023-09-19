import { sliceInput } from "../shared/utils.js";

/**
 * Manages state for the token reader
 */

/**
 * Represents a single lexeme in the language
 * @typedef {import ("../lexer/token.js").Token} Token
 */

export class Reader {
  /**
   * Constructor
   * @param {Token[]} tokens
   * @param {import("../shared/diagnostics/diagnostic-bag.js").DiagnosticBag} diagnostics
   * @param {string} input
   */
  constructor(tokens, diagnostics, input) {
    this.tokens = tokens;
    this.diagnostics = diagnostics;
    this.input = input;
    this.pos = 0;
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

  eof() {
    this.pos >= this.length;
  }

  /**
   * Looks ahead n positions from the current one
   * @param {number} n
   * @returns {Token}
   */
  lookahead(n = 1) {
    return this.tokens[this.pos + n];
  }

  /**
   * Returns the current token and advances the token stream position by 1
   * @returns {Token}
   */
  next() {
    return this.tokens[this.pos++];
  }

  /**
   * Returns the token at the current position
   * @returns {Token}
   */
  peek() {
    return this.tokens[this.pos];
  }

  /**
   * Skips the token at the current position
   */
  skip() {
    this.pos++;
  }
}

export default Reader;
