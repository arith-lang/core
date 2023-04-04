import { SyntaxException } from "@arith-lang/core";
import { SrcLoc, TokenBag } from "@arith-lang/lexer";

/**
 * @class TokenReader
 * @desc Manages the state of the token stream in the reader
 * @property {Token} tokens
 * @property {number} pos
 * @property {number} length
 */
export class TokenReader {
  /**
   * Constructs a TokenReader
   * @param {TokenBag} tokens
   */
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  /**
   * Static constructor for TokenReader
   * @param {TokenBag} tokens
   * @returns {TokenReader}
   */
  static new(tokens) {
    return new TokenReader(tokens);
  }

  get length() {
    return this.tokens.length;
  }

  /**
   * Throws a syntax error when invalid syntax occurs
   * @param {string} message
   * @param {SrcLoc} srcloc
   * @returns {never}
   */
  croak(message, srcloc) {
    throw new SyntaxException(message, srcloc);
  }

  /**
   * Checks if we're at the end of the token stream
   * @returns {boolean}
   */
  eof() {
    return this.pos >= this.length;
  }

  /**
   * Gets a token n positions after this.pos
   * @param {number} n
   */
  lookahead(n = 1) {
    return this.tokens[this.pos + n];
  }

  /**
   * Gets the current token and advances the stream by 1
   */
  next() {
    return this.tokens[this.pos++];
  }

  /**
   * Gets the current token without advancing the stream
   */
  peek() {
    return this.tokens[this.pos];
  }
}
