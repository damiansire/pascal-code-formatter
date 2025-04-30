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
        type: "PROGRAM_NAME_DECLARATION"
      },
      EmptyLine,
      {
        tokens: [{ type: "KEYWORD", value: "var" }],
        indentation: 0,
        type: "VAR_DECLARATION"
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
        type: "VAR_DECLARATION"
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
        type: "VAR_DECLARATION"
      },
      EmptyLine,
      {
        tokens: [{ type: "KEYWORD", value: "begin" }],
        indentation: 0,
        type: "BEGIN_DECLARATION"
      },
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
        ],
        indentation: 0,
        type: "END_DECLARATION"
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
        type: "UNKNOWN"
      },
      EmptyLine,
      {
        tokens: [{ type: "KEYWORD", value: "begin" }],
        indentation: 0,
        type: "UNKNOWN"
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
        type: "UNKNOWN"
      },
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
          WhiteSpace,
          { type: "COMMENT_STAR", value: "(* El punto final es crucial! *)" },
        ],
        indentation: 0,
        type: "UNKNOWN"
      },
    ];

    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should format if-then-else with comments", () => {
    // Wrap the fragment in a minimal program structure for a valid test
    const input = `program TestIfElse;
var temperaturaActual: integer;
begin
  temperaturaActual := 30;
  if temperaturaActual >= 25 (* Comprueba si la temperatura es igual o superior a 25 grados *)
  then begin
    writeln('¡Hace calor! Enciende el aire acondicionado.'); (* Acción si hace calor *)
  end else begin
    writeln('Temperatura agradable. Aire acondicionado apagado'); (* Acción si no hace calor *)
  end; // Semicolon added for syntax
end.
`;

    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          { type: "KEYWORD", value: "program" }, WhiteSpace, { type: "IDENTIFIER", value: "TestIfElse" }, { type: "DELIMITER_SEMICOLON", value: ";" }
        ], indentation: 0,
        type: "UNKNOWN"
      },
      EmptyLine,
      {
        tokens: [{ type: "KEYWORD", value: "var" }], indentation: 0,
        type: "UNKNOWN"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "temperaturaActual" }, { type: "DELIMITER_COLON", value: ":" }, WhiteSpace, { type: "KEYWORD", value: "integer" }, { type: "DELIMITER_SEMICOLON", value: ";" }
        ], indentation: 1,
        type: "UNKNOWN"
      },
      EmptyLine,
      {
        tokens: [{ type: "KEYWORD", value: "begin" }], indentation: 0,
        type: "UNKNOWN"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "temperaturaActual" }, WhiteSpace, { type: "OPERATOR_ASSIGN", value: ":=" }, WhiteSpace, { type: "NUMBER_INTEGER", value: "30" }, { type: "DELIMITER_SEMICOLON", value: ";" }
        ], indentation: 1,
        type: "UNKNOWN"
      },
      EmptyLine,
      {
        tokens: [
          { type: "KEYWORD", value: "if" }, WhiteSpace, { type: "IDENTIFIER", value: "temperaturaActual" }, WhiteSpace, { type: "OPERATOR_GREATER_EQUAL", value: ">=" }, WhiteSpace, { type: "NUMBER_INTEGER", value: "25" }, WhiteSpace, { type: "KEYWORD", value: "then" }, WhiteSpace, { type: "COMMENT_STAR", value: "(* Comprueba si la temperatura es igual o superior a 25 grados *)" }
        ], indentation: 1,
        type: "UNKNOWN"
      },
      {
        tokens: [{ type: "KEYWORD", value: "begin" }], indentation: 1,
        type: "UNKNOWN"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "writeln" }, { type: "DELIMITER_LPAREN", value: "(" }, { type: "STRING_LITERAL", value: "¡Hace calor! Enciende el aire acondicionado." }, { type: "DELIMITER_RPAREN", value: ")" }, { type: "DELIMITER_SEMICOLON", value: ";" }, WhiteSpace, { type: "COMMENT_STAR", value: "(* Acción si hace calor *)" }
        ], indentation: 2,
        type: "UNKNOWN"
      },
      {
        tokens: [{ type: "KEYWORD", value: "end" }], indentation: 1,
        type: "UNKNOWN"
      },
      {
        tokens: [{ type: "KEYWORD", value: "else" }], indentation: 1,
        type: "UNKNOWN"
      },
      {
        tokens: [{ type: "KEYWORD", value: "begin" }], indentation: 1,
        type: "UNKNOWN"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "writeln" }, { type: "DELIMITER_LPAREN", value: "(" }, { type: "STRING_LITERAL", value: "Temperatura agradable. Aire acondicionado apagado" }, { type: "DELIMITER_RPAREN", value: ")" }, { type: "DELIMITER_SEMICOLON", value: ";" }, WhiteSpace, { type: "COMMENT_STAR", value: "(* Acción si no hace calor *)" }
        ], indentation: 2,
        type: "UNKNOWN"
      },
      {
        tokens: [{ type: "KEYWORD", value: "end" }, { type: "DELIMITER_SEMICOLON", value: ";" }], indentation: 1,
        type: "UNKNOWN"
      },
      {
        tokens: [{ type: "KEYWORD", value: "end" }, { type: "DELIMITER_DOT", value: "." }], indentation: 0,
        type: "UNKNOWN"
      }
    ];

    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

});
