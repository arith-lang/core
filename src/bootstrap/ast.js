import { Record } from "immutable";

/**
 * AST nodes for the bootstrap compiler
 */

export const ASTTypes = {
  Program: "Program",
  VariableDefinition: "VariableDefinition",
  FunctionExpression: "FunctionExpression",
  CallExpression: "CallExpression",
  IfExpression: "IfExpression",
  ForExpression: "ForExpression",
  CondExpression: "CondExpression",
  TryCatch: "TryCatch",
  Module: "Module",
  Include: "Include",
  Provide: "Provide",
  JSImport: "JSImport",
  Quote: "Quote",
  NumberLiteral: "NumberLiteral",
  StringLiteral: "StringLiteral",
  BooleanLiteral: "BooleanLiteral",
  KeywordLiteral: "KeywordLiteral",
  NilLiteral: "NilLiteral",
  Identifier: "Identifier",
  MemberExpression: "MemberExpression",
  OptionalMemberExpression: "OptionalMemberExpression",
};

export const Program = Record({
  type: ASTTypes.Program,
  nodes: [],
  srcloc: null,
});

export const VariableDefinition = Record({
  type: ASTTypes.VariableDefinition,
  name: null,
  initializer: null,
  srcloc: null,
});

export const FunctionExpression = Record({
  type: ASTTypes.FunctionExpression,
  async: false,
  params: [],
  body: [],
  srcloc: null,
});

export const CallExpression = Record({
  type: ASTTypes.CallExpression,
  func: null,
  args: [],
  body: [],
  srcloc: null,
});

export const IfExpression = Record({
  type: ASTTypes.IfExpression,
  condition: null,
  consequent: null,
  alternate: null,
  srcloc: null,
});

export const ForExpression = Record({
  type: ASTTypes.ForExpression,
  operator: null,
  binds: [],
  iters: [],
  body: [],
  srcloc: null,
});

export const CondExpression = Record({
  type: ASTTypes.CondExpression,
  clauses: [],
  alternate: null,
  srcloc: null,
});

export const TryCatch = Record({
  type: ASTTypes.TryCatch,
  try: [],
  error: "",
  catch: [],
  finally: null,
});

export const Module = Record({
  type: ASTTypes.Module,
  name: "",
  body: [],
  srcloc: null,
});

export const Include = Record({
  type: ASTTypes.Include,
  names: null, // destructured imports via record macro
  module: null,
  srcloc: null,
});

export const Provide = Record({
  type: ASTTypes.Provide,
  member: null,
  srcloc: null,
});

export const JSImport = Record({
  type: ASTTypes.JSImport,
  namespace: null, // namespace import
  names: null, // destructured imports via record macro
  module: "", // the string of the module being imported
  srcloc: null,
});

export const Quote = Record({
  type: ASTTypes.Quote,
  value: null,
  srcloc: null,
});

export const NumberLiteral = Record({
  type: ASTTypes.NumberLiteral,
  value: "",
  srcloc: null,
});

export const StringLiteral = Record({
  type: ASTTypes.StringLiteral,
  value: "",
  srcloc: null,
});

export const BooleanLiteral = Record({
  type: ASTTypes.BooleanLiteral,
  value: "",
  srcloc: null,
});

export const KeywordLiteral = Record({
  type: ASTTypes.KeywordLiteral,
  value: "",
  srcloc: null,
});

export const NilLiteral = Record({
  type: ASTTypes.NilLiteral,
  srcloc: null,
});

export const Identifier = Record({
  type: ASTTypes.Identifier,
  name: "",
  srcloc: null,
});

export const MemberExpression = Record({
  type: ASTTypes.MemberExpression,
  object: null,
  property: null,
  srcloc: null,
});

export const OptionalMemberExpression = Record({
  type: ASTTypes.OptionalMemberExpression,
  object: null,
  property: null,
  srcloc: null,
});
