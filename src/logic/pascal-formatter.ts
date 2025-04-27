import { tokenizePascal, PascalToken } from "pascal-tokenizer";
import { FormatPascalCodeOptions } from "../shared/types";
import { FormatterController } from "./formatter.controller";
import { StructureManager } from "./structure-manager";
import { StateManager } from "./state-manager";

class PascalFormatter {
  private tokens: PascalToken[];
  private options: FormatPascalCodeOptions;
  private formatterController: FormatterController;
  private stateManager: StateManager;
  private structureManager: StructureManager;
  constructor(private code: string, options: FormatPascalCodeOptions) {
    this.tokens = tokenizePascal(this.code);
    this.options = options;
    this.formatterController = new FormatterController();
    this.stateManager = new StateManager();
    this.structureManager = new StructureManager();
  }

  format() {
    for (let index = 0; index < this.tokens.length; index++) {
      const prevToken = this.tokens[index - 1];
      const currentToken = this.tokens[index];
      const nextToken = this.tokens[index + 1];
      this.processToken(prevToken, currentToken, nextToken);
    }
    return this.formatterController.getFormattedLines();
  }

  processToken(prevToken: PascalToken, currentToken: PascalToken, nextToken: PascalToken) {
    this.structureManager.processToken(prevToken, currentToken, nextToken);
    this.formatterController.addTokenToCurrentLine(currentToken);
    const state = this.stateManager.evaluateState(currentToken, nextToken);
    if (state.needWhiteSpace) {
      this.formatterController.addWhiteSpace();
    }
    if (state.isEndOfLine) {
      this.formatterController.finalizeLine();
    }
    if (this.structureManager.needAddEmptyLine()) {
      this.formatterController.addEmptyLine();
    }
  }
}

export { PascalFormatter };
