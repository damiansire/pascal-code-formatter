import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine } from "./types";

export const whiteSpace: PascalToken = { type: "WHITESPACE", value: " " };
export const EmptyLine: FormattedPascalLine = {
  tokens: [],
  indentation: 0,
};
