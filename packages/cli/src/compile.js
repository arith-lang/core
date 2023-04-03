import { tokenize } from "@arith-lang/lexer";

/**
 * Runs the whole compilation pipeline on a string of Arith code
 * @param {string} input
 * @param {string} file
 */
export function compile(input, file = "file://stdin") {
  return tokenize(input, file);
}
