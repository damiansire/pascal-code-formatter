import { tokenizePascal, PascalToken } from "pascal-tokenizer";
import { FormatPascalCodeOptions } from "../shared/types";
import { FormatterController } from "./formatter.controller";
import { isEndOfLine, needWhiteSpace } from "../shared/libs";

class PascalFormatter {
  private tokens: PascalToken[];
  private options: FormatPascalCodeOptions;
  private formatterController: FormatterController;
  constructor(private code: string, options: FormatPascalCodeOptions) {
    this.tokens = tokenizePascal(this.code, false);
    this.options = options;
    this.formatterController = new FormatterController();
  }

  format() {
    for (let index = 0; index < this.tokens.length; index++) {
      const prevToken = this.tokens[index - 1];
      const currentToken = this.tokens[index];
      const nextToken = this.tokens[index + 1];
      this.processToken(prevToken, currentToken, nextToken);
    }

    let formattedLines = this.formatterController.getFormattedLines();

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

    return this.formatterController.getFormattedLines();
  }

  processToken(prevToken: PascalToken, currentToken: PascalToken, nextToken: PascalToken) {
    this.formatterController.addTokenToCurrentLine(currentToken);

    const addWhiteSpace = needWhiteSpace(currentToken, nextToken);
    if (addWhiteSpace) {
      this.formatterController.addWhiteSpace();
    }

    const finishLine = isEndOfLine(currentToken, nextToken)
    if (finishLine) {
      this.formatterController.finalizeLine();
    }
  }
}

export { PascalFormatter };
