import TokenTypes from "../lexer/token-types.js";
import { Cons } from "../shared/cons.js";
import DiagnosticBag from "../shared/diagnostics/diagnostic-bag.js";
import AST from "./ast.js";

/**
 * @typedef ParserOutput
 * @prop {import("./ast").AST} ast
 * @prop {DiagnosticBag} diagnostics
 */

/**
 * Parses expanded reader output into a full AST
 * @param {import("../reader/read-syntax").ReaderOutput} readResult
 */
export const parse = (readResult) => {
  const { ast: forms, diagnostics: readerDiagnostics, input } = readResult;
  const diagnostics = DiagnosticBag.from(readerDiagnostics);

  /**
   * Parses any expression
   * @param {Cons|import("../lexer/token.js").Token} form
   */
  const parseExpression = (form) => {
    if (form instanceof Cons) {
      const [first] = form;

      switch (first.value) {
        case "begin":
          return parseBegin(form);
        default:
          throw new Error("Call expressions not implemented yet");
      }
    }

    return parsePrimitive(form);
  };

  /**
   *
   * @param {import("../lexer/token.js").Token} token
   */
  const parsePrimitive = (token) => {
    switch (token.type) {
      case TokenTypes.Number:
        return AST.NumberLiteral(token.value, token.srcloc);
      default:
        throw new Error(`Unimplemented parsing for token type ${token.type}`);
    }
  };

  /**
   * Parses a begin expression
   * @param {Cons} form
   */
  const parseBegin = (form) => {
    const [begin, ...bodyForms] = form;
    const srcloc = begin.srcloc;
    /** @type {(import("./ast.js").AST[])} */
    let exprs = [];

    for (let form of bodyForms) {
      exprs.push(parseExpression(form));
    }

    return AST.Begin(body, srcloc);
  };

  return { ast: parseExpression(forms), diagnostics };
};

export default parse;
