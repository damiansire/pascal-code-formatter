import { PascalToken } from "pascal-tokenizer";

export type LineType = "ASSIGNMENT" | "PROGRAM_NAME_DECLARATION" | "LIBRARIES_IMPORT" | "CONST_DECLARATION" | "TYPE_DECLARATION" | "VAR_DECLARATION" | "PROCEDURE_DEFINITION" | "FUNCTION_DEFINITION" | "CODE_DECLARATION" | "UNKNOWN" | "INITIAL" | "EMPTY" | "UNKNOWN" | "BEGIN_DECLARATION" | "END_DECLARATION";


export interface FormattedPascalLine {
  tokens: PascalToken[];
  indentation: number;
  type: LineType;
}

export interface InternalFormattedPascalLine {
  tokens: PascalToken[];
  indentation: number;
}

export interface FormatPascalCodeOptions {
  ignoreEOF?: boolean;
  addEmptyFinalLine?: boolean;
}


