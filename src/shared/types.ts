import { PascalToken } from "pascal-tokenizer";

export type LineType = "ASSIGNMENT" | "PROGRAM_NAME" | "CONST_DECLARATION" | "TYPE_DECLARATION" | "VAR_DECLARATION" | "PROCEDURE_DEFINITION" | "FUNCTION_DEFINITION" | "CODE_DECLARATION" | "UNKNOWN" | "INITIAL" | "EMPTY" | "UNKNOWN";

export interface FormattedPascalLine {
  tokens: PascalToken[];
  indentation: number;
  type: LineType;
}

export interface FormatPascalCodeOptions {
  ignoreEOF?: boolean;
  addEmptyFinalLine?: boolean;
}


