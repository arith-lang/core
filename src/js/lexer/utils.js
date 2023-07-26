// Character matchers
export const isDot = (ch) => /\./.test(ch);
export const isDigit = (ch) => /\d/.test(ch);
export const isWhitespace = (ch) => /[\s,]/.test(ch);
export const isSemicolon = (ch) => /;/.test(ch);
export const isNewline = (ch) => /\n/.test(ch);
export const isDash = (ch) => /\-/.test(ch);
export const isPlus = (ch) => /\+/.test(ch);
export const isDoubleQuote = (ch) => /"/.test(ch);
export const isSymbolStart = (ch) => /[=<>%|?\\/*\p{L}_$!+-]/u.test(ch);
export const isSymbolChar = (ch) =>
  /[:=@~<>%&|?\\/^*&#'\p{L}\p{N}_$!+-]/u.test(ch);
export const isLParen = (ch) => /\(/.test(ch);
export const isRParen = (ch) => /\)/.test(ch);
export const isLBrack = (ch) => /\[/.test(ch);
export const isRBrack = (ch) => /\]/.test(ch);
export const isLBrace = (ch) => /\{/.test(ch);
export const isRBrace = (ch) => /\}/.test(ch);
export const isAmp = (ch) => /&/.test(ch);
export const isHash = (ch) => /#/.test(ch);
export const isQuote = (ch) => ch === "'";
export const isQQuote = (ch) => ch === "`";
export const isUQuote = (ch) => ch === "~";
export const isAt = (ch) => ch === "@";
export const isBinChar = (ch) => /[0-1]/.test(ch);
export const isOctChar = (ch) => /[0-7]/.test(ch);
export const isHexChar = (ch) => /[0-9a-fA-F]/.test(ch);
export const isAlphaNumeric = (ch) => /[\da-fA-F]/.test(ch);

// String matchers
export const isBoolean = (str) => /true|false/.test(str);
export const isNil = (str) => /nil/.test(str);
export const isRational = (str) => /^[\+\-]?\d+\/\d+$/.test(str);
export const isComplex = (str) =>
  /^[\+\-]?(\d+(\.\d+)?\+)?\d+(\.\d+)?i$/.test(str);

const DECIMAL = String.raw`^[+-]?\d+\.\d+(e[+-]\d+)?$`;
const FLOAT = new RegExp(DECIMAL + "f");
const REAL = new RegExp(DECIMAL);
const HEX = String.raw`0x[0-9a-fA-F]+`;
const BIN = String.raw`0b[0-1]+`;
const OCT = String.raw`0o[0-7]+`;
const INT = String.raw`\d+`;
const INTEGER = new RegExp(`^[+-]?(${HEX}|${OCT}|${BIN}|${INT})$`);

export const isFloat = (str) => FLOAT.test(str);
export const isReal = (str) => REAL.test(str);
export const isInteger = (str) => INTEGER.test(str);
