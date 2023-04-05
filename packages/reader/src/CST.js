import { Cons } from "@arith-lang/core";
import { Token } from "@arith-lang/lexer";
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
