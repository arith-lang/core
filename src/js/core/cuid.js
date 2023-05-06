import { createId } from "@paralleldrive/cuid2";

/**
 * Generates a secure CUID
 * @returns {string}
 */
export function cuid() {
  return createId();
}
