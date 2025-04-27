import { PascalToken } from "pascal-tokenizer";

export interface FormattedPascalLine {
  tokens: PascalToken[];
  indentation: number;
}

export interface FormatPascalCodeOptions {
  ignoreEOF?: boolean;
  addEmptyFinalLine?: boolean;
}
