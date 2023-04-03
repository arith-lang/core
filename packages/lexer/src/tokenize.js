import { Lexer } from "./Lexer.js";
import { TokenBag } from "./TokenBag.js";

/**
 * Reads an input string into tokens
 * @param {string} input
 * @param {string} file
 * @returns {TokenBag}
 */
export function tokenize(input, file) {
  return Lexer.new(input, file).tokenize();
}
