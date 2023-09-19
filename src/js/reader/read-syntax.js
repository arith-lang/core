import DiagnosticBag from "../shared/diagnostics/diagnostic-bag.js";
import Reader from "./reader.js";
import { cons } from "../shared/cons.js";
import { makeToken } from "../shared/make-token.js";
import TokenTypes from "../lexer/token-types.js";

/**
 * Reads the token stream into a data structure for the compiler
 * @param {import("../lexer/lexer").LexerOutput} lexResult
 */
export const readSyntax = (lexResult) => {
  const { tokens, diagnostics: lexerDiagnostics, input } = lexResult;
  const diagnostics = DiagnosticBag.from(lexerDiagnostics);
  const reader = Reader.new(tokens, diagnostics, input);
  const first = tokens[0];

  if (!first) {
    // Use default empty srcloc
    return cons(makeToken(TokenTypes.Symbol, "begin"), null); // change this to reader output with diagnostics
  }

  const srcloc = first.srcloc;
  const output = cons(makeToken(TokenTypes.Symbol, "begin", srcloc), null);
};
