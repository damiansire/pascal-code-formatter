import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine, LineType } from "./types";

export const WhiteSpace: PascalToken = { type: "WHITESPACE", value: " " };
export const EmptyLine: FormattedPascalLine = {
  tokens: [],
  indentation: 0,
  type: "EMPTY"
};

const HighLevelProgramStructureElements: LineType[] = ["PROGRAM_NAME_DECLARATION", "LIBRARIES_IMPORT", "CONST_DECLARATION", "TYPE_DECLARATION", "VAR_DECLARATION", "PROCEDURE_DEFINITION", "FUNCTION_DEFINITION", "BEGIN_DECLARATION"]

export const ProgramSections = ["PROGRAM_NAME_DECLARATION", "LIBRARIES_IMPORT", "CONST_DECLARATION", "TYPE_DECLARATION", "VAR_DECLARATION", "PROCEDURE_DEFINITION", "FUNCTION_DEFINITION"]


export const HighLevelCounterWeightRules = HighLevelProgramStructureElements.map(element => {
  return {
    mainElement: element,
    counterweights: HighLevelProgramStructureElements,
  }
});