import DiagnosticBag from "../shared/diagnostics/diagnostic-bag.js";
import Reader from "./reader.js";

/**
 * Reads the token stream into a data structure for the compiler
 * @param {import("../lexer/lexer").LexerOutput} lexResult
 */
export const readSyntax = (lexResult) => {
  const { tokens, diagnostics: lexerDiagnostics, input } = lexResult;
  const diagnostics = DiagnosticBag.from(lexerDiagnostics);
  const reader = Reader.new(tokens, diagnostics, input);
};
