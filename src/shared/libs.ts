import { PascalToken } from "pascal-tokenizer";

const isComment = (token: PascalToken): boolean => {
  return ["COMMENT_STAR", "COMMENT_BLOCK_BRACE", "COMMENT_LINE"].includes(token?.type);
};

const isOperator = (token: PascalToken): boolean => {
  return ["OPERATOR_EQUAL", "OPERATOR_ASSIGN", "OPERATOR_GREATER", "OPERATOR_LESS"].includes(token?.type);
};


export { isComment, isOperator };
