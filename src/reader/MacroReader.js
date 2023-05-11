import { SyntaxException } from "../core/exceptions.js";
import { Cons, cons } from "../core/cons.js";
import { Token } from "../lexer/Token.js";
import { TokenTypes } from "../lexer/TokenTypes.js";
import { TokenReader } from "./TokenReader.js";
import { MacroToken } from "./MacroToken.js";
import { getListInternalCode } from "./utils.js";

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
        throw new SyntaxException(
          `Unknown reader macro ${token.value}`,
          token.srcloc
        );
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
    return this.readQuoteMacro(token, "quasiquote");
  }

  /**
   * Reads a ' macro as a quote expression
   * @param {Token} token
   * @returns {Cons}
   */
  readQuote(token) {
    return this.readQuoteMacro(token, "quote");
  }

  readQuoteMacro(token, type) {
    const { value, srcloc, trivia } = token;
    const newToken = MacroToken.new(
      TokenTypes.Reserved,
      type,
      srcloc,
      trivia,
      value
    );
    this.reader.skip();
    const quote = cons(newToken, this.read(this.reader));
    quote.srcloc = srcloc;
    quote.code = getListInternalCode(quote);
    return quote;
  }

  /**
   * Reads a record macro as a function call
   * @param {Token} token
   * @returns {Cons}
   */
  readRecord(token) {
    const { value, srcloc, trivia } = token;
    const first = MacroToken.new(
      TokenTypes.Identifier,
      "record",
      srcloc,
      trivia,
      value
    );
    const rec = cons(first, null);
    rec.srcloc = srcloc;

    // skip open brace token
    this.reader.skip();
    token = this.reader.peek();

    while (token.type !== TokenTypes.RBrace) {
      rec.append(this.read(this.reader));
      token = this.reader.peek();
    }
    const code = getListInternalCode(rec) + token.trivia + token.value;
    rec.code = code;
    return rec;
  }

  /**
   * Reads a ~@ macro as a splice-unquote expression
   * @param {Token} token
   * @returns {Cons}
   */
  readSpliceUnquote(token) {
    return this.readQuoteMacro(token, "splice-unquote");
  }

  /**
   * Reads a vector macro as a function call
   * @param {Token} token
   * @returns {Cons}
   */
  readVector(token) {
    const { value, srcloc, trivia } = token;
    const first = MacroToken.new(
      TokenTypes.Identifier,
      "vector",
      srcloc,
      trivia,
      value
    );
    const vec = cons(first, null);
    vec.srcloc = srcloc;

    // skip open bracket token
    this.reader.skip();
    token = this.reader.peek();

    while (token.type !== TokenTypes.RBrack) {
      vec.append(this.read(this.reader));
      token = this.reader.peek();
    }
    const code = getListInternalCode(vec) + token.trivia + token.value;
    vec.code = code;
    return vec;
  }

  /**
   * Reads a ~ macro as an unquote expression
   * @param {Token} token
   * @returns {Cons}
   */
  readUnquote(token) {
    return this.readQuoteMacro(token, "unquote");
  }
}
