import SrcLoc from "../lexer/src-loc.js";
import Token from "../lexer/token.js";
import SrcLoc from "../lexer/src-loc.js";
import TokenTypes from "../lexer/token-types.js";

/**
 * Creates a new arbitrary token to add to the reader output or in expansion
 * @param {string} value
 * @param {SrcLoc} srcloc
 */
export const makeSymbolToken = (
  value,
  srcloc = SrcLoc.new(0, 0, 0, "created"),
) => Token.new(TokenTypes.Symbol, value, srcloc, "");
