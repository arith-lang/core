import * as assertions from "./assertions.js";
import * as keyword from "./keyword.js";
import * as number from "./number.js";

export const createRuntime = () => {
  return {
    ...assertions,
    ...keyword,
    ...number,
  };
};

export default createRuntime;
