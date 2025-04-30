import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine, LineType } from "./types";
import { CounterweightStack } from "counterweight-stack";
import { ProgramSections } from "./elements";

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

const needWhiteSpace = (currentToken: PascalToken, nextToken: PascalToken) => {
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

  return needWhiteSpace;
}

const getLineType = (typeStack: CounterweightStack<LineType>, tokens: PascalToken[]) => {
  const internal_type = getInternalType(tokens);
  if (internal_type === "DECLARATION") {
    return typeStack.peek() || "UNKNOWN";
  }

  if (ProgramSections.includes(internal_type)) {
    return internal_type;
  }

  return internal_type;
}

const getInternalType = (tokens: PascalToken[]): LineType | "DECLARATION" => {
  if (tokens.some(token => token.value === "program")) {
    return "PROGRAM_NAME_DECLARATION";
  }
  if (tokens.some(token => token.value === ":=")) {
    return "ASSIGNMENT";
  }
  if (tokens.some(token => token.value === "var")) {
    return "VAR_DECLARATION";
  }
  if (tokens.some(token => token.value === "begin")) {
    return "CODE_DECLARATION";
  }
  if (tokens.some(token => token.value === "end")) {
    return "CODE_DECLARATION";
  }
  if (tokens.some(token => token.value === "procedure")) {
    return "PROCEDURE_DEFINITION";
  }
  if (tokens.some(token => token.value === "function")) {
    return "FUNCTION_DEFINITION";
  }
  if (tokens.some(token => token.value === "const")) {
    return "CONST_DECLARATION";
  }
  if (tokens.some(token => token.value === "type")) {
    return "TYPE_DECLARATION";
  }
  if (tokens.some(token => token.value === "uses")) {
    return "LIBRARIES_IMPORT";
  }
  if (tokens.some(token => token.value === ":")) {
    return "DECLARATION"
  }
  if (tokens.length === 0) {
    return "EMPTY"
  }
  return "UNKNOWN";
}

const needAddEmptyLine = (history: CounterweightStack<LineType>, prevLine: FormattedPascalLine | undefined, nextLine: FormattedPascalLine) => {
  if (!prevLine) {
    return false;
  }
  if (prevLine.type !== nextLine.type) {
    return true;
  }

  return false;
}

export { isComment, isOperator, isEndOfLine, needWhiteSpace, getLineType, needAddEmptyLine };
