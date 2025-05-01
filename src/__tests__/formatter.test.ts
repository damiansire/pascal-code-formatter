import { formatPascalCode } from "../formatter";
import { FormattedPascalLine } from "../shared/types";
import { WhiteSpace, EmptyLine, VAR, PROGRAM, DELIMITER_SEMICOLON, DELIMITER_COLON, KEYWORD_INTEGER, KEYWORD_BEGIN } from "../shared/elements";

describe("formatPascalCode", () => {
  test("should return correct result for simple program", () => {
    const input = "program Test; var x: integer; y: integer; begin end.";
    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          PROGRAM,
          WhiteSpace,
          { type: "IDENTIFIER", value: "Test" },
          DELIMITER_SEMICOLON,
        ],
        indentation: 0,
        type: "PROGRAM_NAME_DECLARATION",
        structuralType: "PROGRAM_NAME_DECLARATION",
      },
      EmptyLine,
      {
        tokens: [VAR],
        indentation: 0,
        type: "VAR_DECLARATION",
        structuralType: "VARS_DECLARATION",
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "x" },
          DELIMITER_COLON,
          WhiteSpace,
          KEYWORD_INTEGER,
          DELIMITER_SEMICOLON,
        ],
        indentation: 1,
        type: "DECLARATION",
        structuralType: "VARS_DECLARATION",
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "y" },
          DELIMITER_COLON,
          WhiteSpace,
          KEYWORD_INTEGER,
          DELIMITER_SEMICOLON,
        ],
        indentation: 1,
        type: "DECLARATION",
        structuralType: "VARS_DECLARATION",
      },
      EmptyLine,
      {
        tokens: [KEYWORD_BEGIN],
        indentation: 0,
        type: "BEGIN_DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
        ],
        indentation: 0,
        type: "END_DECLARATION",
        structuralType: "CODE_EXECUTION"
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
          PROGRAM,
          WhiteSpace,
          { type: "IDENTIFIER", value: "MiPrimerPrograma" },
          DELIMITER_SEMICOLON,
        ],
        indentation: 0,
        type: "PROGRAM_NAME_DECLARATION",
        structuralType: "PROGRAM_NAME_DECLARATION"
      },
      EmptyLine,
      {
        tokens: [KEYWORD_BEGIN],
        indentation: 0,
        type: "BEGIN_DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Hola, mundo!" },
          { type: "DELIMITER_RPAREN", value: ")" },
          DELIMITER_SEMICOLON,
          WhiteSpace,
          { type: "COMMENT_STAR", value: "(* Muestra un mensaje en pantalla *)" },
        ],
        indentation: 1,
        type: "UNKNOWN",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
          WhiteSpace,
          { type: "COMMENT_STAR", value: "(* El punto final es crucial! *)" },
        ],
        indentation: 0,
        type: "END_DECLARATION",
        structuralType: "CODE_EXECUTION"
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
    if temperaturaActual >= 25 then (* Comprueba si la temperatura es igual o superior a 25 grados *)
    begin
      writeln('¡Hace calor! Enciende el aire acondicionado.'); (* Acción si hace calor *)
    end else begin
      writeln('Temperatura agradable. Aire acondicionado apagado'); (* Acción si no hace calor *)
    end; // Semicolon added for syntax
  end.
  `;

    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          PROGRAM, WhiteSpace, { type: "IDENTIFIER", value: "TestIfElse" }, DELIMITER_SEMICOLON
        ], indentation: 0,
        type: "PROGRAM_NAME_DECLARATION",
        structuralType: "PROGRAM_NAME_DECLARATION"
      },
      EmptyLine,
      {
        tokens: [VAR], indentation: 0,
        type: "VAR_DECLARATION",
        structuralType: "VARS_DECLARATION"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "temperaturaActual" }, DELIMITER_COLON, WhiteSpace, KEYWORD_INTEGER, DELIMITER_SEMICOLON
        ], indentation: 1,
        type: "DECLARATION",
        structuralType: "VARS_DECLARATION"
      },
      EmptyLine,
      {
        tokens: [KEYWORD_BEGIN], indentation: 0,
        type: "BEGIN_DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "temperaturaActual" }, WhiteSpace, { type: "OPERATOR_ASSIGN", value: ":=" }, WhiteSpace, { type: "NUMBER_INTEGER", value: "30" }, DELIMITER_SEMICOLON
        ], indentation: 1,
        type: "ASSIGNMENT",
        structuralType: "CODE_EXECUTION"
      },
      EmptyLine,
      {
        tokens: [
          { type: "KEYWORD", value: "if" }, WhiteSpace, { type: "IDENTIFIER", value: "temperaturaActual" }, WhiteSpace, { type: "OPERATOR_GREATER_EQUAL", value: ">=" }, WhiteSpace, { type: "NUMBER_INTEGER", value: "25" }, WhiteSpace, { type: "KEYWORD", value: "then" }, WhiteSpace, { type: "COMMENT_STAR", value: "(* Comprueba si la temperatura es igual o superior a 25 grados *)" }
        ], indentation: 1,
        type: "IF_STATEMENT",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [KEYWORD_BEGIN], indentation: 1,
        type: "BEGIN_DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "writeln" }, { type: "DELIMITER_LPAREN", value: "(" }, { type: "STRING_LITERAL", value: "¡Hace calor! Enciende el aire acondicionado." }, { type: "DELIMITER_RPAREN", value: ")" }, DELIMITER_SEMICOLON, WhiteSpace, { type: "COMMENT_STAR", value: "(* Acción si hace calor *)" }
        ], indentation: 2,
        type: "UNKNOWN",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [{ type: "KEYWORD", value: "end" }], indentation: 1,
        type: "END_DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [{ type: "KEYWORD", value: "else" }], indentation: 1,
        type: "DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [KEYWORD_BEGIN], indentation: 1,
        type: "BEGIN_DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "writeln" }, { type: "DELIMITER_LPAREN", value: "(" }, { type: "STRING_LITERAL", value: "Temperatura agradable. Aire acondicionado apagado" }, { type: "DELIMITER_RPAREN", value: ")" }, DELIMITER_SEMICOLON, WhiteSpace, { type: "COMMENT_STAR", value: "(* Acción si no hace calor *)" }
        ], indentation: 2,
        type: "DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [{ type: "KEYWORD", value: "end" }, DELIMITER_SEMICOLON], indentation: 1,
        type: "END_DECLARATION",
        structuralType: "CODE_EXECUTION"
      },
      {
        tokens: [{ type: "KEYWORD", value: "end" }, { type: "DELIMITER_DOT", value: "." }], indentation: 0,
        type: "END_DECLARATION",
        structuralType: "CODE_EXECUTION"
      }
    ];

    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

});
