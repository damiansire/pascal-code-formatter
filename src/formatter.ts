import { PascalToken, TokenType } from "pascal-tokenizer";
import { tokenizePascal } from "pascal-tokenizer";

const isComment = (token: PascalToken): boolean => {
  return ["COMMENT_STAR", "COMMENT_BLOCK_BRACE", "COMMENT_LINE"].includes(token.type);
};

const isBreakLineKeyword = (token: PascalToken, nextToken: PascalToken | null): boolean => {
  if (token.type === "KEYWORD" && token.value === "end" && nextToken?.type === "DELIMITER_DOT") {
    return false;
  }
  return token.type === "KEYWORD" && ["begin", "end", "var"].includes(token.value);
};

const isNewLine = (token: PascalToken, nextToken: PascalToken | null): boolean => {
  if (nextToken === null) {
    return isComment(token) || token.type === "DELIMITER_SEMICOLON";
  }

  if (isComment(nextToken)) {
    return true;
  }
  if (token.type === "DELIMITER_SEMICOLON" || isComment(token) || isBreakLineKeyword(token, nextToken)) {
    return true;
  }
  return false;
};

export interface FormattedPascalLine {
  tokens: PascalToken[];
  indentation: number;
}

export interface FormatPascalCodeOptions {
  ignoreEOF?: boolean;
  addEmptyFinalLine?: boolean;
}

const isWhitespaceRequired = (currentToken: PascalToken, nextToken: PascalToken): boolean => {
  if (currentToken.type === "KEYWORD") {
    if (currentToken.value === "program") {
      return true;
    }
  }
  return false;
};

export function formatPascalCode(code: string, options: FormatPascalCodeOptions = {}): FormattedPascalLine[] {
  const { ignoreEOF = true, addEmptyFinalLine = false } = options;

  const tokenizeCode: PascalToken[] = tokenizePascal(code);
  const lines: FormattedPascalLine[] = [];
  let currentLine: FormattedPascalLine = { tokens: [], indentation: 0 };

  for (let index = 0; index < tokenizeCode.length; index++) {
    const token = tokenizeCode[index];
    const nextToken = tokenizeCode[index + 1] || null;

    if (token.type === "EOF" && ignoreEOF) {
      continue;
    }

    currentLine.tokens.push(token);

    if (isWhitespaceRequired(token, nextToken)) {
      currentLine.tokens.push({ type: "WHITESPACE", value: " " });
    }

    if (isNewLine(token, nextToken)) {
      lines.push(currentLine);
      currentLine = { tokens: [], indentation: 0 };
    }
  }

  if (currentLine.tokens.length > 0) {
    lines.push(currentLine);
  }

  if (addEmptyFinalLine && lines.length > 0 && lines[lines.length - 1].tokens.length > 0) {
    lines.push({ tokens: [], indentation: 0 });
  }

  return lines;
}
