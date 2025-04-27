import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine } from "../shared/types";
import { EmptyLine, WhiteSpace } from "../shared/elements";
import { IdentationManager } from "./identation-manager";

class FormatterController {
  private currentLineTokens: PascalToken[];
  private formattedLines: FormattedPascalLine[];
  private indentationManager: IdentationManager;

  constructor() {
    this.currentLineTokens = [];
    this.formattedLines = [];
    this.indentationManager = new IdentationManager();
  }

  public addTokenToCurrentLine(token: PascalToken): void {
    this.currentLineTokens.push(token);
  }

  public finalizeLine(): void {
    if (this.currentLineTokens.length > 0) {
      const deepLine = this.indentationManager.evaluateLineIndentation(this.currentLineTokens);
      this.formattedLines.push({
        tokens: [...this.currentLineTokens],
        indentation: deepLine,
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
