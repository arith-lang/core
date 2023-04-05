import { cons, Cons, SyntaxException } from "@arith-lang/core";
import { Token, TokenBag, TokenTypes } from "@arith-lang/lexer";
import { TokenReader } from "./TokenReader.js";
import { MacroReader } from "./MacroReader.js";
import { macrotokens } from "./macrotokens.js";
import { MemberExpression } from "./expressions/MemberExpression.js";
import { OptionalMemberExpression } from "./expressions/OptionalMemberExpression.js";

const PRECEDENCE = { [TokenTypes.Dot]: 90, [TokenTypes.OptionalMember]: 90 };

/**
 * @typedef {import("./CST").CST} CST
 */

/**
 * Reads a list form from the token stream
 * @param {TokenReader} reader
 * @returns {Cons}
 */
function readList(reader) {}

/**
 *
 * @param {TokenReader} reader
 * @param {CST} left
 * @returns {MemberExpression|OptionalMemberExpression}
 */
function readMemberExpression(reader, left) {}

/**
 * Reads a reader macro from the token stream
 * @param {TokenReader} reader
 * @returns {CST}
 */
function readMacro(reader) {
  return MacroReader.new(reader, readExpr);
}

/**
 * Reads atomic forms from the token stream
 * @param {TokenReader} reader
 * @returns {Token}
 */
function readAtom(reader) {
  const token = reader.next();

  switch (token.type) {
    case TokenTypes.Integer:
    case TokenTypes.Decimal:
    case TokenTypes.Double:
    case TokenTypes.String:
    case TokenTypes.MultilineString:
    case TokenTypes.Boolean:
    case TokenTypes.Keyword:
    case TokenTypes.Nil:
    case TokenTypes.Amp:
    case TokenTypes.Reserved:
    case TokenTypes.Identifier:
      return token;
    default:
      throw new SyntaxException(
        `Invalid token type ${token.type}`,
        token.srcloc
      );
  }
}

/**
 * Reads a syntactic form from the token stream
 * @param {TokenReader} reader
 * @returns {CST}
 */
function readForm(reader) {
  const token = reader.peek();

  if (macrotokens.includes(token.type)) {
    return readMacro(reader);
  }

  if (token.type === TokenTypes.LParen) {
    return readList(reader);
  }

  return readAtom(reader);
}

/**
 * Reads an expression from the token stream
 *
 * Handles parsing expressions like MemberExpression
 * @param {TokenReader} reader
 * @returns {CST}
 */
function readExpr(reader, bp = 0) {
  const left = readForm(reader);
  const token = reader.peek();
  let prec = PRECEDENCE[token.type];

  // this works because Number(undefined) is NaN which always coerces to false
  while (bp < prec) {
    left = readMemberExpression(reader, left);
    reader.skip(); // skip the operator
    prec = PRECEDENCE[reader.peek()?.type];
  }

  return left;
}

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
