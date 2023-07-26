import { create, all, factory } from "mathjs";

const config = {
  number: "BigNumber",
};

export const math = create(all, config);

math.import([
  factory(
    "BigInt",
    ["typed"],
    function createBigInt({ typed }) {
      typed.addType({
        name: "BigInt",
        test: (x) => typeof x === "bigint",
      });

      return BigInt;
    },
    { lazy: false },
  ),

  factory(
    "bigint",
    ["typed", "BigInt"],
    function createBigint({ typed, BigInt }) {
      return typed("bigint", {
        "number | string": (x) => BigInt(x),
      });
    },
  ),
]);

export default math;
