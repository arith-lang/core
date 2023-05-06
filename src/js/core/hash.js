import objectHash from "object-hash";

/**
 * Hashes any object into a string
 * @param {any} obj
 * @returns {string}
 */
export function hash(obj) {
  return objectHash(obj, { excludeKeys: (key) => key === Symbol.for(":--id--") });
}
