import { Cons } from "../core/cons.js";
import { Token } from "../lexer/Token.js";
import { MemberExpression } from "./expressions/MemberExpression";
import { OptionalMemberExpression } from "./expressions/OptionalMemberExpression";

/**
 * Union type for Concrete Syntax Tree (s-expressions)
 * @typedef {
 *  | Token
 *  | Cons
 *  | MemberExpression
 *  | OptionalMemberExpression
 * } CST
 */
