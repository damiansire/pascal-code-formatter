import { PascalToken, TokenType } from "pascal-tokenizer";
import { tokenizePascal } from "pascal-tokenizer";
import { FormatPascalCodeOptions, FormattedPascalLine } from "./shared/types";
import { EmptyLine } from "./shared/elements";

const formatPascalCode = (code: string, options: FormatPascalCodeOptions = {}): FormattedPascalLine[] => {
  const { ignoreEOF = true, addEmptyFinalLine = false } = options;
  const tokens = tokenizePascal(code);

  return [];
};

export { formatPascalCode };
