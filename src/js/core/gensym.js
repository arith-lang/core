import { createId } from "@paralleldrive/cuid2";

/**
 * Generates a random symbol value
 * @returns {symbol}
 */
export function gensym() {
  return Symbol.for(createId());
}
