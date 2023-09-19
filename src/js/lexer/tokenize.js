import InputStream from "./input-stream.js";
import Lexer from "./lexer.js";

/**
 *
 * @param {string} input
 * @param {string} file
 * @returns {import("./lexer").LexerOutput}
 */
export const tokenize = (input, file = "<stdin>") => {
  return Lexer.new(InputStream.new(input, file)).tokenize();
};

export default tokenize;
