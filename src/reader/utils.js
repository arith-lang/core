import { Cons } from "../core/cons.js";

/**
 * Extract the code from a CST list
 * @param {Cons} list
 * @returns {string}
 */
export function getListInternalCode(list) {
  let code = "";

  for (let el of lst) {
    code += el.code ? el.code : el.trivia + (el.macro ? el.macro : el.value);
  }

  return code;
}
