// Character matchers
export const isDot = (ch) => /\./.test(ch);
export const isDigit = (ch) => /\d/.test(ch);
export const isWhitespace = (ch) => /[\s,]/.test(ch);
export const isSemicolon = (ch) => /;/.test(ch);
export const isNewline = (ch) => /\n/.test(ch);
export const isDash = (ch) => /\-/.test(ch);
export const isPlus = (ch) => /\+/.test(ch);
export const isDoubleQuote = (ch) => /"/.test(ch);
export const isSymbolStart = (ch) => /[=<>%\|\?\\\/\*\p{L}_\$!\+\-]/u.test(ch);
export const isSymbolChar = (ch) =>
  /[=@~<>%&\|\?\\\/^\*&#'\p{L}\p{N}_\$!\+\-]/u.test(ch);
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
export const isAlphaNumeric = (ch) => /[0-9a-zA-Z]/.test(ch);
export const isForwardSlash = (ch) => /\//.test(ch);
export const isColon = (ch) => /:/.test(ch);

// String matchers
export const isBoolean = (str) => /true|false/.test(str);
export const isNil = (str) => /nil/.test(str);
