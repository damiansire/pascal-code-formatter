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

export interface FormattedPascalLine {
  tokens: PascalToken[];
  indentation: number;
}

export function formatPascalCode(tokenizeCode: PascalToken[]): FormattedPascalLine[] {
  const lines: FormattedPascalLine[] = [];
  let currentLine: FormattedPascalLine = { tokens: [], indentation: 0 };
  let newLine = false;
  let indentation = 0;

  for (let index = 0; index < tokenizeCode.length; index++) {
    const token = tokenizeCode[index];
    const nextToken = tokenizeCode[index + 1] || null;

    if (isNewLine(token, nextToken)) {
      newLine = true;
    }

    currentLine.tokens.push(token);
    if (newLine) {
      lines.push(currentLine);
      currentLine = { tokens: [], indentation: 0 };
      newLine = false;
    }
  }

  return lines;
}
