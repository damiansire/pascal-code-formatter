import { PascalToken } from "pascal-tokenizer";

export interface FormattedPascalLine {
  tokens: PascalToken[];
  indentation: number;
}

export interface FormatPascalCodeOptions {
  ignoreEOF?: boolean;
  addEmptyFinalLine?: boolean;
}

export enum ProgramStructureState {
  ProgramNameDeclaration = "PROGRAM_NAME_DECLARATION",
  ConstDeclaration = "CONST_DECLARATION",
  TypeDeclaration = "TYPE_DECLARATION",
  VarDeclaration = "VAR_DECLARATION",
  ProcedureDefinition = "PROCEDURE_DEFINITION",
  FunctionDefinition = "FUNCTION_DEFINITION",
  CodeDeclaration = "CODE_DECLARATION",
  Unknown = "UNKNOWN",
  Initial = "INITIAL",
}
