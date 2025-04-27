import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine } from "./types";

export const WhiteSpace: PascalToken = { type: "WHITESPACE", value: " " };
export const EmptyLine: FormattedPascalLine = {
  tokens: [],
  indentation: 0,
};
