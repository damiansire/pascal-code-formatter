import { formatPascalCode, FormattedPascalLine } from "../index";
import { PascalToken, TokenType } from "pascal-tokenizer";

describe("formatPascalCode", () => {
  const whiteSpace: PascalToken = { type: "WHITESPACE", value: " " };

  test("should return an empty array for empty input", () => {
    const input = "";
    const expected: FormattedPascalLine[] = [];
    expect(formatPascalCode(input)).toEqual(expected);
  });

  test("should return correct result for only named program", () => {
    const input = "program Test;";
    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          { type: "KEYWORD", value: "program" },
          whiteSpace,
          { type: "IDENTIFIER", value: "Test" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0,
      },
    ];
    expect(formatPascalCode(input)).toEqual(expected);
  });

  test("can handle final end.", () => {
    const input = "end.";

    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
        ],
        indentation: 0,
      },
    ];
    expect(formatPascalCode(input)).toEqual(expected);
  });

  test("should return correct result for simple program", () => {
    const input = "program Test; var x: integer; begin end.";
    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          { type: "KEYWORD", value: "program" },
          whiteSpace,
          { type: "IDENTIFIER", value: "Test" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0,
      },
      {
        tokens: [{ type: "KEYWORD", value: "var" }],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "x" },
          { type: "DELIMITER_COLON", value: ":" },
          whiteSpace,
          { type: "KEYWORD", value: "integer" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0,
      },
      {
        tokens: [{ type: "KEYWORD", value: "begin" }],
        indentation: 0,
      },
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
        ],
        indentation: 0,
      },
    ];
    expect(formatPascalCode(input)).toEqual(expected);
  });
});
