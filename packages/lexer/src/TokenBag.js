import { SrcLoc } from "./SrcLoc.js";
import { Token } from "./Token.js";
import { TokenTypes } from "./TokenTypes.js";

/**
 * @class TokenBag
 * @desc Container for syntax tokens
 * @property {Token[]} _tokens
 */
export class TokenBag {
  /**
   * Constructs a new TokenBag
   */
  constructor() {
    this._tokens = [];
  }

  /**
   * Static constructor for TokenBag
   */
  static new() {
    return new TokenBag();
  }

  /**
   * Getter for length
   */
  get length() {
    return this._tokens.length;
  }

  /**
   * Adds a boolean token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addBooleanToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.Boolean, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds a decimal token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addDecimalToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.Decimal, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds a double token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addDoubleToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.Double, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds an identifier token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addIdentifierToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.Identifier, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds an integer token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addIntegerToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.Integer, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds a nil token to the bag
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addNilToken(srcloc, trivia) {
    const token = Token.new(TokenTypes.Nil, "nil", srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds an integer token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addIntegerToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.Integer, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds a keyword token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addKeywordToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.Keyword, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds a multiline string token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addMultilineStringToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.MultilineString, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Adds a double-quoted string token to the bag
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  addStringToken(value, srcloc, trivia) {
    const token = Token.new(TokenTypes.String, value, srcloc, trivia);
    this.append(token);
  }

  /**
   * Append a token
   * @param {Token}
   */
  append(token) {
    this._tokens.push(token);
  }

  /**
   * Iterator for TokenBag
   */
  *[Symbol.iterator]() {
    for (let token of this._tokens) {
      yield token;
    }
  }
}
