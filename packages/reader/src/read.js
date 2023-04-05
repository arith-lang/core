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
function readList(reader) {
  let start = reader.next();
  const srcloc = start.srcloc;
  let token = reader.peek();

  if (token.type === TokenTypes.RParen) {
    throw new SyntaxException(`Parenthesized list cannot be empty`, srcloc);
  }

  let lst = cons(readExpr(reader), null);
  lst.srcloc = srcloc;
  token = reader.peek();

  while (token.type !== TokenTypes.RParen) {
    if (!token) {
      // Whoops, ran out of tokens before the end of the list
      throw new SyntaxException(`Expected ")", got EOF`, prev.srcloc);
    }

    lst.append(readExpr(reader));
    token = reader.peek();
  }
  // skip end token
  reader.skip();

  // get the list's code from its elements
  let code = start.trivia + start.value;

  for (let el of lst) {
    code += el.code ? el.code : el.trivia + el.value;
  }

  code += token.trivia + token.value;

  // add code property to list for consistency with other expressions' interfaces
  lst.code = code;

  return lst;
}

/**
 * Read member expressions from the token stream
 * @param {TokenReader} reader
 * @param {CST} left
 * @returns {MemberExpression|OptionalMemberExpression}
 */
function readMemberExpression(reader, left) {
  const operator = reader.next();
  const property = readExpr(reader);
  let code =
    left.type === "MemberExpression"
      ? left.code.split(".")[1]
      : left.type === "OptionalMemberExpression"
      ? left.code.split(".?")[1]
      : left.code
      ? left.code
      : left.trivia + left.value + operator.trivia + operator.value;
  code += property.code ? property.code : property.trivia + property.value;

  return operator.type === TokenTypes.Dot
    ? // if MemberExpression or OptionalMemberExpression, property will be an Identifier token
      MemberExpression.new(left, property, left.srcloc, code)
    : OptionalMemberExpression.new(left, property, srcloc, code);
}

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
