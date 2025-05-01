import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine, StructuralType } from "./types";

export const WhiteSpace: PascalToken = { type: "WHITESPACE", value: " " };

export const EmptyLine: FormattedPascalLine = {
  tokens: [],
  indentation: 0,
  type: "EMPTY",
  structuralType: "EMPTY",
};

const StructuralElements: StructuralType[] = ["PROGRAM_NAME_DECLARATION", "LIBRARIES_IMPORT", "CONSTS_DECLARATION", "TYPES_DECLARATION", "VARS_DECLARATION", "PROCEDURES_DEFINITIONS", "FUNCTIONS_DEFINITIONS", "CODE_EXECUTION"]

export const StructuralElementsWeightRules = StructuralElements.map(element => {
  return {
    mainElement: element,
    counterweights: StructuralElements,
  }
});