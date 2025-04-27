import { tokenizePascal, PascalToken } from "pascal-tokenizer";
import { FormatPascalCodeOptions } from "../shared/types";
import { FormatterController } from "./formatter.controller";
import { StateManager } from "./state-manager";

class PascalFormatter {
  private tokens: PascalToken[];
  private options: FormatPascalCodeOptions;
  private formatterController: FormatterController;
  private stateManager: StateManager;
  constructor(private code: string, options: FormatPascalCodeOptions) {
    this.tokens = tokenizePascal(this.code);
    this.options = options;
    this.formatterController = new FormatterController();
    this.stateManager = new StateManager();
  }

  format() {
    for (let index = 0; index < this.tokens.length; index++) {
      const prevToken = this.tokens[index - 1];
      const currentToken = this.tokens[index];
      const nextToken = this.tokens[index + 1];
      this.processToken(prevToken, currentToken, nextToken);
    }
    return [];
  }
  processToken(prevToken: PascalToken, currentToken: PascalToken, nextToken: PascalToken) {
    this.stateManager.processToken(prevToken, currentToken, nextToken);
  }
}

export { PascalFormatter };
