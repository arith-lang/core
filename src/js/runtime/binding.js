import { Namespace } from "./Namespace.js";

/**
 * Sets a variable in its current namespace
 * @param {Namespace} ns
 * @param {string} name
 * @param {any} value
 * @returns {void}
 */
export function setq(ns, name, value) {
  ns.set(Symbol.for(name), value);
}
/**
 * Gets a variable from the current namespace
 * @param {Namespace} ns
 * @param {string} name
 * @returns {any}
 */
export function getq(ns, name) {
  return ns.get(Symbol.for(name));
}

/**
 * Gets a var object from the current namespace
 * @param {Namespace} ns
 * @param {string} name
 * @returns {Var} Var object a variable value is stored as in the namespace
 */
export function getv(ns, name) {
  return ns.var(name);
}
