import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine } from "../shared/types";

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
    this.formattedLines.push({
      tokens: [],
      indentation: 0,
    });
  }

  public getFormattedLines(): FormattedPascalLine[] {
    return this.formattedLines;
  }
}

export { FormatterController };
