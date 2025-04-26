import { PascalToken, TokenType } from "pascal-tokenizer";

const isComment = (token: PascalToken): boolean => {
  return ["COMMENT_STAR", "COMMENT_BLOCK_BRACE", "COMMENT_LINE"].includes(token.type);
};

const isBreakLineKeyword = (token: PascalToken): boolean => {
  return token.type === "KEYWORD" && ["begin", "end", "var"].includes(token.value);
};

const isNewLine = (token: PascalToken, nextToken: PascalToken): boolean => {
  if (nextToken === null || isComment(nextToken)) {
    return false;
  }
  if (token.type === "DELIMITER_SEMICOLON" || isComment(token) || isBreakLineKeyword(token)) {
    return true;
  }
  return false;
};

export function formatPascalCode(tokenizeCode: PascalToken[]): PascalToken[][] {
  const lines: PascalToken[][] = [];
  let currentLine: PascalToken[] = [];
  let newLine = false;

  for (let index = 0; index < tokenizeCode.length; index++) {
    const token = tokenizeCode[index];
    const nextToken = tokenizeCode[index + 1] || null;

    if (isNewLine(token, nextToken)) {
      newLine = true;
    }

    currentLine.push(token);
    if (newLine) {
      lines.push(currentLine);
      currentLine = [];
      newLine = false;
    }
  }

  return lines;
}
