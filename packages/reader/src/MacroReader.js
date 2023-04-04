import { cons, Cons, SyntaxException } from '@arith-lang/core';
import { Token, TokenTypes } from '@arith-lang/lexer';
import { TokenReader } from './TokenReader';
/**
 * @callback ReaderFunction
 * @param {TokenReader} reader
 * @returns {Cons}
 */
/**
 * @class MacroReader
 * @desc Reads and expands reader macros into their parsed representation
 * @property {TokenReader} reader
 * @property {ReaderFunction} read
 */
export class MacroReader {
  /**
   *
   * @param {TokenReader} reader
   * @param {ReaderFunction} read
   */
  constructor(reader, read) {
    this.reader = reader;
    this.read = read;
  }

  /**
   * Static constructor for MacroReader
   * @param {TokenReader} reader
   * @param {ReaderFunction} read
   * @returns {MacroReader}
   */
  static new(reader, read) {
    return new MacroReader(reader, read);
  }

  /**
   * Dispatcher for reading the various macros
   * @param {Token} token
   */
  read(token) {
    switch (token.type) {
      case TokenTypes.Quote:
        return this.readQuote();
      case TokenTypes.QQuote:
        return this.readQuasiquote();
      case TokenTypes.SUQuote:
        return this.readSpliceUnquote();
      case TokenTypes.UQuote:
        return this.readUnquote();
      case TokenTypes.Hash:
        return this.readHashMacro(token);
      default:
        throw new SyntaxException(`Unknown reader macro ${token.value}`, token.srcloc);
    }
  }

  /**
   * Reads a # macro
   * @param {Token} token
   */
  readHashMacro(token) {}

  /**
   * Reads a ` macro as a quasiquote expression
   */
  readQuasiquote() {}

  /**
   * Reads a ' macro as a quote expression
   * @returns {Cons}
   */
  readQuote() {}

  /**
   * Reads a ~@ macro as a splice-unquote expression
   */
  readSpliceUnquote () {}

  /**
   * Reads a ~ macro as an unquote expression
   */
  readUnquote() {}
}
