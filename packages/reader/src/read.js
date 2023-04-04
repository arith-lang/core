import { cons, Cons } from "@arith-lang/core";
import { Token, TokenBag, TokenTypes } from "@arith-lang/lexer";
import { TokenReader } from "./TokenReader.js";
import { MacroReader } from "./MacroReader.js";

/**
 * Reads an expression from the token stream
 *
 * Handles parsing expressions like MemberExpression
 * @param {TokenReader} reader
 * @returns {AST}
 */
function readExpr(reader) {}

/**
 *
 * @param {TokenBag} tokens
 * @returns {Cons}
 */
export function read(tokens) {
  const reader = TokenReader.new(tokens);
  let parseTree = cons(readExpr(reader), null);

  while (!reader.eof()) {
    parseTree.append(readExpr(reader));
  }

  return parseTree;
}
