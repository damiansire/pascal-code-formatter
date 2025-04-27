import { tokenizePascal } from "pascal-tokenizer";
import { FormatPascalCodeOptions } from "../shared/types";

class PascalFormatter {
  private tokens;
  private options: FormatPascalCodeOptions;
  constructor(private code: string, options: FormatPascalCodeOptions) {
    this.tokens = tokenizePascal(this.code);
    this.options = options;
  }

  format() {
    return [];
  }
}

export { PascalFormatter };
