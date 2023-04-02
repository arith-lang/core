import { Token } from "./Token.js";

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
  new() {
    return new TokenBag();
  }

  /**
   * Getter for length
   */
  get length() {
    return this._tokens.length;
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
