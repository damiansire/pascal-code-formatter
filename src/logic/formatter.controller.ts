import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine } from "../shared/types";
import { EmptyLine, WhiteSpace } from "../shared/elements";

class FormatterController {
  private currentIndentationLevel: number;
  private currentLineTokens: PascalToken[];
  private formattedLines: FormattedPascalLine[];

  constructor() {
    this.currentIndentationLevel = 0;
    this.currentLineTokens = [];
    this.formattedLines = [];
  }

  public incrementIndentation(): void {
    this.currentIndentationLevel++;
  }

  public addTokenToCurrentLine(token: PascalToken): void {
    this.currentLineTokens.push(token);
  }

  public finalizeLine(): void {
    if (this.currentLineTokens.length > 0) {
      this.formattedLines.push({
        tokens: [...this.currentLineTokens],
        indentation: this.currentIndentationLevel,
      });
      this.currentLineTokens = [];
    }
  }

  public addEmptyLine(): void {
    this.formattedLines.push(EmptyLine);
  }

  public addWhiteSpace() {
    this.currentLineTokens.push(WhiteSpace);
  }

  public getFormattedLines(): FormattedPascalLine[] {
    return this.formattedLines;
  }
}

export { FormatterController };
