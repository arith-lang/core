import * as assertions from "./assertions.js";
import * as keyword from "./keyword.js";
import * as number from "./number.js";
import * as object from "./object.js";

export const createRuntime = () => {
  return {
    ...assertions,
    ...keyword,
    ...number,
    ...object,
  };
};

export default createRuntime;
