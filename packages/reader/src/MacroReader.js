import { cons, Cons, SyntaxException } from '@arith-lang/core';
import { Token, TokenTypes } from '@arith-lang/lexer';
import { TokenReader } from './TokenReader.js';
import { MacroToken } from './MacroToken.js';

/**
 * @callback ReaderFunction
 * @param {TokenReader} reader
 * @returns {CST}
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
        return this.readQuote(token);
      case TokenTypes.QQuote:
        return this.readQuasiquote(token);
      case TokenTypes.SUQuote:
        return this.readSpliceUnquote(token);
      case TokenTypes.UQuote:
        return this.readUnquote(token);
      case TokenTypes.Hash:
        return this.readHashMacro(token);
      case TokenTypes.RBrack:
        return this.readVector(token);
      case TokenTypes.RBrace:
        return this.readRecord(token);
      default:
        throw new SyntaxException(`Unknown reader macro ${token.value}`, token.srcloc);
    }
  }

  /**
   * Reads a # macro
   * @param {Token} token
   * @returns {CST}
   */
  readHashMacro(token) {
    const next = this.reader.lookahead(1);
    // do later
  }

  /**
   * Reads a ` macro as a quasiquote expression
   * @param {Token} token
   * @returns {Cons}
   */
  readQuasiquote(token) {
    const { value, srcloc, trivia } = token;
    const newToken = MacroToken.new(TokenTypes.Reserved, "quote", srcloc, trivia, value);
    this.reader.skip();
    return cons(newToken, this.read(this.reader));
  }

  /**
   * Reads a ' macro as a quote expression
   * @param {Token} token
   * @returns {Cons}
   */
  readQuote(token) {
    const { value, srcloc, trivia } = token;
    const newToken = MacroToken.new(TokenTypes.Reserved, "quote", srcloc, trivia, value);
    this.reader.skip();
    return cons(newToken, this.read(this.reader));
  }

  /**
   * Reads a record macro as a function call
   * @param {TokenReader} reader
   * @returns {Cons}
   */
  readRecord(reader) {}

  /**
   * Reads a ~@ macro as a splice-unquote expression
   * @param {Token} token
   * @returns {Cons}
   */
  readSpliceUnquote (token) {
    const { value, srcloc, trivia } = token;
    const newToken = MacroToken.new(TokenTypes.Reserved, "quote", srcloc, trivia, value);
    this.reader.skip();
    return cons(newToken, this.read(this.reader));
  }

  /**
   * Reads a vector macro as a function call
   * @param {Token} token
   * @returns {Cons}
   */
  readVector(token) {}

  /**
   * Reads a ~ macro as an unquote expression
   * @param {Token} token
   * @returns {Cons}
   */
  readUnquote(token) {
    const { value, srcloc, trivia } = token;
    const newToken = MacroToken.new(TokenTypes.Reserved, "quote", srcloc, trivia, value);
    this.reader.skip();
    return cons(newToken, this.read(this.reader));
  }
}
