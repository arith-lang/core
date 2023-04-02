import ffi from "ffi-napi";

/**
 * Gets input from the command line
 *
 * Since it uses the Node.js FFI it should be compatible with both Unix and Window systems.
 * @param {string} [prompt=""]
 * @returns {string}
 */
export function readline (prompt = "") {
  const rllib = ffi.Library("libreadline", {
    readline: ["string", ["string"]],
  });

  return rllib.readline(prompt.toString());
}
