import { tokenize } from "@arith-lang/lexer";
import { read } from "@arith-lang/reader";

/**
 * Runs the whole compilation pipeline on a string of Arith code
 * @param {string} input
 * @param {string} file
 */
export function compile(input, file = "file://stdin") {
  return read(tokenize(input, file));
}

const code = `15`;

console.log(compile(code));
