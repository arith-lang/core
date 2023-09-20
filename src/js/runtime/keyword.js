export const isKeyword = (obj) =>
  typeof obj === "symbol" && obj.description.startsWith(":");
