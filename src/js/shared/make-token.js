import SrcLoc from "../lexer/src-loc.js";
import Token from "../lexer/token.js";
import SrcLoc from "../lexer/src-loc.js";

/**
 * Creates a new arbitrary token to add to the reader output or in expansion
 * @param {import("../lexer/token-types.js").TokenTypes} type
 * @param {string} value
 * @param {SrcLoc} srcloc
 */
export const makeToken = (
  type,
  value,
  srcloc = SrcLoc.new(0, 0, 0, "created"),
) => Token.new(type, value, srcloc, "");
