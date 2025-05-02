import { formatPascalCode } from "../formatter";
import { FormattedPascalLine, LineType, StructuralType } from "../shared/types";
import { WhiteSpace, EmptyLine, VAR, PROGRAM, DELIMITER_SEMICOLON, DELIMITER_COLON, KEYWORD_INTEGER, KEYWORD_BEGIN } from "../shared/elements";
import { program, varDecl, varDef, begin, end, writeln, ifStatement, elseStatement, line } from "./test-helpers";


describe("Simple Cases", () => {
  test("should handle basic string in writeln", () => {
    const input = "program Test; begin writeln('Hello, world!'); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("'Hello, world!'"),
      end(0, true)
    ];
    expect(formatPascalCode(input)).toEqual(expected);
  });

  test("should handle escaped single quotes in strings", () => {
    const input = "program Test; begin writeln('It''s a beautiful day'); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("'It''s a beautiful day'"),
      end(0, true)
    ];
    expect(formatPascalCode(input)).toEqual(expected);
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
      writeln("'Simple string'"),
      writeln("'String with ''escaped'' quotes'"),
      writeln("'String with multiple ''quotes'' here'"),
      end(0, true)
    ];
    expect(formatPascalCode(input)).toEqual(expected);
  });

  test("should handle empty strings", () => {
    const input = "program Test; begin writeln(''); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("''"),
      end(0, true)
    ];
    expect(formatPascalCode(input)).toEqual(expected);
  });

  test("should handle strings with only escaped quotes", () => {
    const input = "program Test; begin writeln(''''); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("''''"),
      end(0, true)
    ];
    expect(formatPascalCode(input)).toEqual(expected);
  });

  test("should handle strings with multiple escaped quotes", () => {
    const input = "program Test; begin writeln(''''''''); end.";
    const expected: FormattedPascalLine[] = [
      program("Test"),
      EmptyLine,
      begin(),
      writeln("''''''''"),
      end(0, true)
    ];
    expect(formatPascalCode(input)).toEqual(expected);
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
    expect(formatPascalCode(input)).toEqual(expected);
  });

  test("should format a simple Hello World program with comments", () => {
    const input = "program MiPrimerPrograma;begin writeln('Hola, mundo!'); (* Muestra un mensaje en pantalla *) end. (* El punto final es crucial! *)";
    const expected: FormattedPascalLine[] = [
      program("MiPrimerPrograma"),
      EmptyLine,
      begin(),
      writeln("'Hola, mundo!'", "Muestra un mensaje en pantalla"),
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
    expect(formatPascalCode(input)).toEqual(expected);
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
      writeln("'¡Hace calor! Enciende el aire acondicionado.'", "Acción si hace calor", 2),
      end(1),
      elseStatement(),
      begin(1),
      writeln("'Temperatura agradable. Aire acondicionado apagado'", "Acción si no hace calor", 2),
      line(
        [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ], 1, "END_DECLARATION", "CODE_EXECUTION"),
      end(0, true)
    ];
    expect(formatPascalCode(input)).toEqual(expected);
  });

});

describe("one line test", () => {
  const input = `if temperaturaActual > 25 (* Comprueba si la temperatura supera los 25 grados *) then begin writeln('¡Hace calor! Enciende el aire acondicionado.'); (* Acción si hace calor *) end else begin writeln('Temperatura agradable. Aire acondicionado apagado'); (* Acción si no hace calor *) end.`
  const result = formatPascalCode(input);

  test("first line is only condition", () => {
    expect(result[0]).toEqual(
      ifStatement("temperaturaActual > 25", "Comprueba si la temperatura supera los 25 grados")
    );
  })
})