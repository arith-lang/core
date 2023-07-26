const DECIMAL = String.raw`^[+-]?\d+\.\d+(e[+-]\d+)?$`;
const FLOAT = new RegExp(DECIMAL + "f");
const REAL = new RegExp(DECIMAL);
const HEX = String.raw`0x[0-9a-fA-F]+`;
const BIN = String.raw`0b[0-1]+`;
const OCT = String.raw`0o[0-7]+`;
const INT = String.raw`\d+`;
const INTEGER = new RegExp(`^[+-]?(${HEX}|${OCT}|${BIN}|${INT})$`);

export const isRational = (str) => /^[\+\-]?\d+\/\d+$/.test(str);
export const isComplex = (str) =>
  /^[\+\-]?(\d+(\.\d+)?\+)?\d+(\.\d+)?i$/.test(str);
export const isFloat = (str) => FLOAT.test(str);
export const isReal = (str) => REAL.test(str);
export const isInteger = (str) => INTEGER.test(str);
