import { PascalToken } from "pascal-tokenizer";

const isComment = (token: PascalToken): boolean => {
  return ["COMMENT_STAR", "COMMENT_BLOCK_BRACE", "COMMENT_LINE"].includes(token?.type);
};

const isOperator = (token: PascalToken): boolean => {
  return ["OPERATOR_EQUAL", "OPERATOR_ASSIGN", "OPERATOR_GREATER", "OPERATOR_LESS"].includes(token?.type);
};

const isEndOfLine = (currentToken: PascalToken, nextToken: PascalToken): boolean => {
  if (!isComment(nextToken)) {
    if (isComment(currentToken)) {
      return true;
    }
    if (currentToken.type === "DELIMITER_SEMICOLON") {
      return true;
    }
    if (currentToken.type === "KEYWORD") {
      if (["begin", "var"].includes(currentToken.value)) {
        return true;
      }
    }
    if (nextToken === undefined) {
      return true;
    }
  }
  return false;
}

export const needWhiteSpace = (currentToken: PascalToken, nextToken: PascalToken) => {
  let needWhiteSpace = false;

  //whitespace evaluator
  if (currentToken.type === "KEYWORD") {
    if (currentToken.value === "program") {
      needWhiteSpace = true;
    }
  }
  if (currentToken.type === "IDENTIFIER" && isOperator(nextToken)) {
    needWhiteSpace = true;
  }

  if (currentToken.type === "OPERATOR_ASSIGN") {
    needWhiteSpace = true;
  }

  if (currentToken.type === "DELIMITER_COLON" && nextToken.type !== "OPERATOR_EQUAL") {
    needWhiteSpace = true;
  }
  if (isComment(nextToken)) {
    needWhiteSpace = true;
  }

  return { needWhiteSpace };
}

/*
  needAddEmptyLine() {
    if (this.currentState === ProgramStructureState.Initial || this.nextState === ProgramStructureState.Initial) {
      return false;
    }
    return this.currentState !== this.nextState;
  }

  getTokenState(token: PascalToken): ProgramStructureState {
    if (token?.type === "KEYWORD") {
      if (token.value === "program") {
        return ProgramStructureState.ProgramNameDeclaration;
      } else if (token.value === "var") {
        return ProgramStructureState.VarDeclaration;
      } else if (token.value === "begin" || token.value === "end") {
        return ProgramStructureState.CodeDeclaration;
      } else if (token.value === "procedure") {
        return ProgramStructureState.ProcedureDefinition;
      } else if (token.value === "function") {
        return ProgramStructureState.FunctionDefinition;
      }
    }
    return ProgramStructureState.Unknown;
  }
*/


export { isComment, isOperator, isEndOfLine };
