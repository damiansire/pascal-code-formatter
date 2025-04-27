import { PascalToken } from "pascal-tokenizer";
import { isComment } from "../shared/libs";

class StateManager {
  constructor() {}

  evaluateState(currentToken: PascalToken, nextToken: PascalToken) {
    let isEndOfLine = false;
    let needWhiteSpace = false;
    //End of line evaluator
    if (!isComment(nextToken)) {
      if (currentToken.type === "DELIMITER_SEMICOLON") {
        isEndOfLine = true;
      }
      if (currentToken.type === "KEYWORD") {
        if (["begin", "var"].includes(currentToken.value)) {
          isEndOfLine = true;
        }
      }
    }

    //whitespace evaluator
    if (currentToken.type === "KEYWORD") {
      if (currentToken.value === "program") {
        needWhiteSpace = true;
      }
    }
    if (currentToken.type === "DELIMITER_COLON" && nextToken.type !== "OPERATOR_EQUAL") {
      needWhiteSpace = true;
    }

    return { isEndOfLine, needWhiteSpace };
  }
}

export { StateManager };
