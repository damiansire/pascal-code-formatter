import { PascalToken } from "pascal-tokenizer";

const isComment = (token: PascalToken): boolean => {
  return ["COMMENT_STAR", "COMMENT_BLOCK_BRACE", "COMMENT_LINE"].includes(token?.type);
};

export { isComment };
