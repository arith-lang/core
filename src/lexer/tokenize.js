import { Lexer } from "./Lexer.js";
import { TokenBag } from "./TokenBag.js";

/**
 * Reads an input string into tokens
 * @param {string} input
 * @param {string} [file="file://stdin"]
 * @returns {TokenBag}
 */
export function tokenize(input, file = "file://stdin") {
  return Lexer.new(input, file).tokenize();
}
