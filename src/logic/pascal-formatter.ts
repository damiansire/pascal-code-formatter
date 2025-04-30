import { tokenizePascal, PascalToken } from "pascal-tokenizer";
import { FormatPascalCodeOptions, FormattedPascalLine, InternalFormattedPascalLine, LineType } from "../shared/types";
import { FormatterController } from "./formatter.controller";
import { getLineType, isEndOfLine, needAddEmptyLine, needWhiteSpace } from "../shared/libs";
import { CounterweightStack, CounterweightRule } from "counterweight-stack";
import { EmptyLine, HighLevelCounterWeightRules } from "../shared/elements";
class PascalFormatter {
  private options: FormatPascalCodeOptions;
  private formatterController: FormatterController;
  private cleanFormattedLines: FormattedPascalLine[] = [];
  private stackHistory: CounterweightStack<LineType>;

  constructor(private code: string, options: FormatPascalCodeOptions) {
    this.options = options;
    const tokens = tokenizePascal(this.code, false);
    this.formatterController = new FormatterController(tokens);
    this.stackHistory = new CounterweightStack(HighLevelCounterWeightRules);
  }

  format(): FormattedPascalLine[] {
    const formattedLines = this.formatterController.getFormattedLines();
    if (formattedLines.length === 0) {
      return []
    }

    const newLine = this.convertToFormattedLine(formattedLines[0])
    this.addToFormattedLine(newLine)

    for (let index = 1; index < formattedLines.length; index++) {
      const prevLine = this.cleanFormattedLines.at(-1);
      const currentLine = this.convertToFormattedLine(formattedLines[index]);

      const addEmptyLine = needAddEmptyLine(this.stackHistory, prevLine, currentLine)
      if (addEmptyLine) {
        this.addToFormattedLine(EmptyLine)
      }
      this.addToFormattedLine(currentLine)
    }

    /*
    //Final review according to the parameters
    if (this.options.ignoreEOF) {
      if (formattedLines.at(-1)?.tokens.at(-1)?.type === "EOF") {
        if (formattedLines[formattedLines.length - 1]?.tokens?.length > 1) {
          formattedLines[formattedLines.length - 1].tokens.pop();
        } else {
          formattedLines.pop();
        }
      }
    }
    */

    return this.cleanFormattedLines;
  }

  convertToFormattedLine(internalFormattedLine: InternalFormattedPascalLine): FormattedPascalLine {
    return {
      tokens: internalFormattedLine.tokens,
      indentation: internalFormattedLine.indentation,
      type: getLineType(this.stackHistory, internalFormattedLine.tokens),
    };
  }

  addToFormattedLine(formattedLine: FormattedPascalLine) {
    const newLine: FormattedPascalLine = {
      tokens: formattedLine.tokens,
      indentation: formattedLine.indentation,
      type: getLineType(this.stackHistory, formattedLine.tokens),
    };
    this.cleanFormattedLines.push(newLine)
    this.stackHistory.push(newLine.type)
  }



}

export { PascalFormatter };
