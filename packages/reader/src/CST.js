import { Cons } from "@arith-lang/core";
import { Token } from "@arith-lang/lexer";
import { MemberExpression } from "./expressions/MemberExpression";
import { OptionalMemberExpression } from "./expressions/OptionalMemberExpression";

/**
 * @typedef {
 *  | Token
 *  | Cons
 *  | MemberExpression
 *  | OptionalMemberExpression
 * } CST
 */
