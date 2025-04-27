import { formatPascalCode } from "../formatter";
import { FormattedPascalLine } from "../shared/types";
import { WhiteSpace, EmptyLine } from "../shared/elements";

describe("formatPascalCode", () => {
  test("should return correct result for simple program", () => {
    const input = "program Test; var x: integer; y: integer; begin end.";
    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          { type: "KEYWORD", value: "program" },
          WhiteSpace,
          { type: "IDENTIFIER", value: "Test" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0,
      },
      EmptyLine,
      {
        tokens: [{ type: "KEYWORD", value: "var" }],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "x" },
          { type: "DELIMITER_COLON", value: ":" },
          WhiteSpace,
          { type: "KEYWORD", value: "integer" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 1,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "y" },
          { type: "DELIMITER_COLON", value: ":" },
          WhiteSpace,
          { type: "KEYWORD", value: "integer" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 1,
      },
      EmptyLine,
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
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should format a simple Hello World program with comments", () => {
    const input =
      "program MiPrimerPrograma;begin writeln('Hola, mundo!'); (* Muestra un mensaje en pantalla *) end. (* El punto final es crucial! *)";

    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          { type: "KEYWORD", value: "program" },
          WhiteSpace,
          { type: "IDENTIFIER", value: "MiPrimerPrograma" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0,
      },
      EmptyLine,
      {
        tokens: [{ type: "KEYWORD", value: "begin" }],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Hola, mundo!" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          WhiteSpace,
          { type: "COMMENT_STAR", value: "(* Muestra un mensaje en pantalla *)" },
        ],
        indentation: 1,
      },
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
          WhiteSpace,
          { type: "COMMENT_STAR", value: "(* El punto final es crucial! *)" },
        ],
        indentation: 0,
      },
    ];

    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });
});
