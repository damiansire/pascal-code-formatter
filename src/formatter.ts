import { FormatPascalCodeOptions, FormattedPascalLine } from "./shared/types";
import { PascalFormatter } from "./logic/pascal-formatter";

const formatPascalCode = (code: string, options: FormatPascalCodeOptions = {}): FormattedPascalLine[] => {
  const pascalFormatter = new PascalFormatter(code, options);
  return pascalFormatter.format();
};

export { formatPascalCode };
