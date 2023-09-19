import SrcLoc from "../lexer/src-loc.js";
import Token from "../lexer/token.js";

/**
 * Creates a new arbitrary token to add to the reader output or in expansion
 * @param {import("../lexer/token-types.js").TokenTypes} type
 * @param {string} value
 */
export const makeToken = (type, value) =>
  Token.new(type, value, SrcLoc.new(0, 0, 0, "created"), "");
