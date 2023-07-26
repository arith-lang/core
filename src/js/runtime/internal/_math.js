import { create, all, typedDependencies, factory } from "mathjs";

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

  factory("add", ["typed"], function createBigIntAdd({ typed }) {
    return typed("add", {
      "BigInt, BigInt": (a, b) => a + b,
    });
  }),

  factory("subtract", ["typed"], function createBigIntSubtract({ typed }) {
    return typed("subtract", {
      "BigInt, BigInt": (a, b) => a - b,
    });
  }),

  factory("multiply", ["typed"], function createBigIntMultiply({ typed }) {
    return typed("multiply", {
      "BigInt, BigInt": (a, b) => a * b,
    });
  }),

  factory("divide", ["typed"], function createBigIntDivide({ typed }) {
    return typed("divide", {
      "BigInt, BigInt": (a, b) => {
        const quotient = math.divide(a, bigIntToBigNum(b));

        if (math.isInteger(quotient)) {
          return BigInt(quotient.toString());
        }

        return quotient;
      },
    });
  }),

  factory("mod", ["typed"], function createBigIntMod({ typed }) {
    return typed("mod", {
      "BigInt, BigInt": (a, b) => a % b,
    });
  }),

  factory("pow", ["typed"], function createBigIntPow({ typed }) {
    return typed("pow", {
      "BigInt, BigInt": (a, b) => a ** b,
    });
  }),

  factory("abs", ["typed"], function createBigIntAbs({ typed }) {
    return typed("abs", {
      BigInt: (x) => (x < 0n ? -x : x),
    });
  }),

  factory("cube", ["typed"], function createBigIntCube({ typed }) {
    return typed("cube", {
      BigInt: (x) => x ** 3n,
    });
  }),
]);

math.typed.addConversion({
  from: "BigInt",
  to: "BigNumber",
  convert: bigIntToBigNum,
});

math.typed.addConversion({
  from: "BigInt",
  to: "number",
  convert: function bigIntToNumber(bigint) {
    return Number(bigint); // could be outside the bounds of safe integers
  },
});

math.typed.addConversion({
  from: "BigInt",
  to: "Fraction",
  convert: function bigIntToFraction(bigint) {
    return math.fraction(Number(bigint), 1); // numerator could be outside the bounds of safe numbers
  },
});

math.typed.addConversion({
  from: "BigInt",
  to: "Complex",
  convert: function bigIntToComplex(bigint) {
    return math.complex(Number(bigint)); // real part could be outside the bounds of safe numbers
  },
});

function bigIntToBigNum(bigint) {
  return math.bignumber(String(bigint));
}

export default math;
