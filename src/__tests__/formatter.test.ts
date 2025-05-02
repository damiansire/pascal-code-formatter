import { formatPascalCode } from "../formatter";
import { FormattedPascalLine, LineType, StructuralType } from "../shared/types";
import { WhiteSpace, EmptyLine, VAR, PROGRAM, DELIMITER_SEMICOLON, DELIMITER_COLON, KEYWORD_INTEGER, KEYWORD_BEGIN } from "../shared/elements";

// Helper functions to make tests more readable
const line = (tokens: any[], indentation: number, type: LineType, structuralType: StructuralType): FormattedPascalLine => ({
  tokens,
  indentation,
  type,
  structuralType
});

const program = (name: string) => line(
  [PROGRAM, WhiteSpace, { type: "IDENTIFIER", value: name }, DELIMITER_SEMICOLON],
  0,
  "PROGRAM_NAME_DECLARATION",
  "PROGRAM_NAME_DECLARATION"
);

const varDecl = () => line(
  [VAR],
  0,
  "VAR_DECLARATION",
  "VARS_DECLARATION"
);

const varDef = (name: string) => line(
  [{ type: "IDENTIFIER", value: name }, DELIMITER_COLON, WhiteSpace, KEYWORD_INTEGER, DELIMITER_SEMICOLON],
  1,
  "DECLARATION",
  "VARS_DECLARATION"
);

const begin = (indent: number = 0) => line(
  [KEYWORD_BEGIN],
  indent,
  "BEGIN_DECLARATION",
  "CODE_EXECUTION"
);

const end = (indent: number = 0, withDot: boolean = false) => line(
  [
    { type: "KEYWORD", value: "end" },
    ...(withDot ? [{ type: "DELIMITER_DOT", value: "." }] : [])
  ],
  indent,
  "END_DECLARATION",
  "CODE_EXECUTION"
);

const writeln = (message: string, comment?: string, indent: number = 1) => line(
  [
    { type: "IDENTIFIER", value: "writeln" },
    { type: "DELIMITER_LPAREN", value: "(" },
    { type: "STRING_LITERAL", value: message },
    { type: "DELIMITER_RPAREN", value: ")" },
    DELIMITER_SEMICOLON,
    ...(comment ? [WhiteSpace, { type: "COMMENT_STAR", value: `(* ${comment} *)` }] : [])
  ],
  indent,
  "UNKNOWN",
  "CODE_EXECUTION"
);

const ifStatement = (condition: string, comment?: string) => line(
  [
    { type: "KEYWORD", value: "if" },
    WhiteSpace,
    { type: "IDENTIFIER", value: "temperaturaActual" },
    WhiteSpace,
    { type: "OPERATOR_GREATER_EQUAL", value: ">=" },
    WhiteSpace,
    { type: "NUMBER_INTEGER", value: "25" },
    WhiteSpace,
    { type: "KEYWORD", value: "then" },
    ...(comment ? [WhiteSpace, { type: "COMMENT_STAR", value: `(* ${comment} *)` }] : [])
  ],
  1,
  "IF_STATEMENT",
  "CODE_EXECUTION"
);

const elseStatement = () => line(
  [{ type: "KEYWORD", value: "else" }],
  1,
  "UNKNOWN",
  "CODE_EXECUTION"
);

describe("Simple Cases", () => {
  test("should handle basic string in writeln", () => {
    const input = "program Test; begin writeln('Hello, world!'); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("Hello, world!"),
      end(0, true)
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should handle escaped single quotes in strings", () => {
    const input = "program Test; begin writeln('It''s a beautiful day'); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("It's a beautiful day"),
      end(0, true)
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should handle multiple writeln statements with escaped quotes", () => {
    const input = `program Test; 
    begin 
      writeln('Simple string');
      writeln('String with ''escaped'' quotes');
      writeln('String with multiple ''quotes'' here');
    end.`;
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("Simple string"),
      writeln("String with 'escaped' quotes"),
      writeln("String with multiple 'quotes' here"),
      end(0, true)
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should handle empty strings", () => {
    const input = "program Test; begin writeln(''); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln(""),
      end(0, true)
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should handle strings with only escaped quotes", () => {
    const input = "program Test; begin writeln(''''); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("'"),
      end(0, true)
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should handle strings with multiple escaped quotes", () => {
    const input = "program Test; begin writeln(''''''''); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("'''"),
      end(0, true)
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });
})

describe("formatPascalCode", () => {
  test("should return correct result for simple program", () => {
    const input = "program Test; var x: integer; y: integer; begin end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      varDecl(),
      varDef("x"),
      varDef("y"),
      EmptyLine,
      begin(),
      end(0, true)
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should format a simple Hello World program with comments", () => {
    const input = "program MiPrimerPrograma;begin writeln('Hola, mundo!'); (* Muestra un mensaje en pantalla *) end. (* El punto final es crucial! *)";
    const expected: FormattedPascalLine[] = [
      program("MiPrimerPrograma"),
      EmptyLine,
      begin(),
      writeln("Hola, mundo!", "Muestra un mensaje en pantalla"),
      line(
        [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
          WhiteSpace,
          { type: "COMMENT_STAR", value: "(* El punto final es crucial! *)" }
        ],
        0,
        "END_DECLARATION",
        "CODE_EXECUTION"
      )
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });

  test("should format if-then-else with comments", () => {
    const input = `program TestIfElse;
var temperaturaActual: integer;
begin
  temperaturaActual := 30;
  if temperaturaActual >= 25 then (* Comprueba si la temperatura es igual o superior a 25 grados *)
  begin
    writeln('¡Hace calor! Enciende el aire acondicionado.'); (* Acción si hace calor *)
  end else begin
    writeln('Temperatura agradable. Aire acondicionado apagado'); (* Acción si no hace calor *)
  end;
end.`;

    const expected: FormattedPascalLine[] = [
      program("TestIfElse"),
      EmptyLine,
      varDecl(),
      varDef("temperaturaActual"),
      EmptyLine,
      begin(),
      line(
        [
          { type: "IDENTIFIER", value: "temperaturaActual" },
          WhiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          WhiteSpace,
          { type: "NUMBER_INTEGER", value: "30" },
          DELIMITER_SEMICOLON
        ],
        1,
        "ASSIGNMENT",
        "CODE_EXECUTION"
      ),
      EmptyLine,
      ifStatement("temperaturaActual >= 25", "Comprueba si la temperatura es igual o superior a 25 grados"),
      begin(1),
      writeln("¡Hace calor! Enciende el aire acondicionado.", "Acción si hace calor", 2),
      end(1),
      elseStatement(),
      begin(1),
      writeln("Temperatura agradable. Aire acondicionado apagado", "Acción si no hace calor", 2),
      line(
        [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ], 1, "END_DECLARATION", "CODE_EXECUTION"),
      end(0, true)
    ];
    expect(formatPascalCode(input, { ignoreEOF: true })).toEqual(expected);
  });
});
