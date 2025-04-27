import { PascalToken } from "pascal-tokenizer";
import { isComment } from "../shared/libs";

class StateManager {
  constructor() {}

  evaluateState(currentToken: PascalToken, nextToken: PascalToken) {
    let isEndOfLine = false;
    let needWhiteSpace = false;
    if (currentToken.type === "DELIMITER_SEMICOLON") {
      if (!isComment(nextToken)) {
        isEndOfLine = true;
      }
    }
    if (currentToken.type === "KEYWORD") {
      if (currentToken.value === "program") {
        needWhiteSpace = true;
      }
    }
    return { isEndOfLine, needWhiteSpace };
  }
}

export { StateManager };
