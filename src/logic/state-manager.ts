import { PascalToken } from "pascal-tokenizer";
import { isComment } from "../shared/libs";

class StateManager {
  constructor() {}

  evaluateState(currentToken: PascalToken, nextToken: PascalToken) {
    let isEndOfLine = false;
    if (currentToken.type === "DELIMITER_SEMICOLON") {
      if (!isComment(nextToken)) {
        isEndOfLine = true;
      }
    }
    return { isEndOfLine };
  }
}

export { StateManager };
