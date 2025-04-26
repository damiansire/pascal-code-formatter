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

  it("too complex and large example", () => {
    const input = `program DemoRecord;

uses Crt; // Opcional, para ClrScr/ReadKey

// --- Sección TYPE donde se declara el RECORD ---
type
  TEstudiante = record // Nombre del tipo record: TEstudiante
    legajo     : Integer;       // Campo para el número de legajo (entero)
    nombre     : string[60];    // Campo para el nombre (cadena de hasta 60 chars)
    promedio   : Real;          // Campo para el promedio (número real)
    activo     : Boolean;       // Campo para indicar si está activo (verdadero/falso)
  end; // Fin de la definición del record TEstudiante

// --- Sección VAR donde se declaran variables del tipo record ---
var
  alumno1 : TEstudiante; // Declara una variable 'alumno1' del tipo TEstudiante
  alumno2 : TEstudiante; // Declara otra variable 'alumno2'

// --- Bloque principal del programa ---
begin
  ClrScr;

  // --- Asignar valores a los campos de alumno1 ---
  // Se accede a cada campo usando el nombre de la variable, un punto (.), y el nombre del campo
  alumno1.legajo := 12345;
  alumno1.nombre := 'Carlos Santana';
  alumno1.promedio := 8.75;
  alumno1.activo := True;

  // --- Asignar valores a alumno2 (copiando alumno1 y modificando) ---
  alumno2 := alumno1; // Puedes asignar un record completo a otro
  alumno2.legajo := 12346; // Modificamos el legajo para alumno2
  alumno2.nombre := 'Juana Molina';
  alumno2.promedio := 9.10;

  // --- Mostrar los datos de alumno1 ---
  Writeln('Datos del Alumno 1:');
  Writeln('Legajo..: ', alumno1.legajo);
  Writeln('Nombre..: ', alumno1.nombre);
  Writeln('Promedio: ', alumno1.promedio:0:2); // Formato con 2 decimales
  Writeln('Activo..: ', alumno1.activo);
  Writeln; // Línea en blanco

  // --- Mostrar los datos de alumno2 ---
  Writeln('Datos del Alumno 2:');
  Writeln('Legajo..: ', alumno2.legajo);
  Writeln('Nombre..: ', alumno2.nombre);
  Writeln('Promedio: ', alumno2.promedio:0:2);
  Writeln('Activo..: ', alumno2.activo);

  ReadKey; // Espera a que el usuario presione una tecla
end.`;

    const expected: FormattedPascalLine[] = [
      {
        tokens: [
          { type: "KEYWORD", value: "program" },
          whiteSpace,
          { type: "IDENTIFIER", value: "DemoRecord" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0,
      },
      { tokens: [], indentation: 0 },
      {
        tokens: [
          { type: "KEYWORD", value: "uses" },
          whiteSpace,
          { type: "IDENTIFIER", value: "Crt" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Opcional, para ClrScr/ReadKey" },
        ],
        indentation: 0,
      },
      { tokens: [], indentation: 0 },
      {
        tokens: [{ type: "COMMENT_LINE", value: "// --- Sección TYPE donde se declara el RECORD ---" }],
        indentation: 0,
      },
      {
        tokens: [{ type: "KEYWORD", value: "type" }],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "TEstudiante" },
          whiteSpace,
          { type: "OPERATOR_EQUAL", value: "=" },
          whiteSpace,
          { type: "KEYWORD", value: "record" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Nombre del tipo record: TEstudiante" },
        ],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "legajo" },
          whiteSpace,
          { type: "DELIMITER_COLON", value: ":" },
          whiteSpace,
          { type: "KEYWORD", value: "Integer" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Campo para el número de legajo (entero)" },
        ],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "nombre" },
          whiteSpace,
          { type: "DELIMITER_COLON", value: ":" },
          whiteSpace,
          { type: "KEYWORD", value: "string" },
          { type: "DELIMITER_LBRACKET", value: "[" },
          { type: "NUMBER_INTEGER", value: "60" },
          { type: "DELIMITER_RBRACKET", value: "]" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Campo para el nombre (cadena de hasta 60 chars)" },
        ],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "promedio" },
          whiteSpace,
          { type: "DELIMITER_COLON", value: ":" },
          whiteSpace,
          { type: "KEYWORD", value: "Real" }, // Assuming case-insensitivity -> real
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace, // Multiple spaces
          { type: "COMMENT_LINE", value: "// Campo para el promedio (número real)" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "activo" },
          whiteSpace, // Multiple spaces
          { type: "DELIMITER_COLON", value: ":" },
          whiteSpace,
          { type: "KEYWORD", value: "Boolean" }, // Assuming case-insensitivity -> boolean
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace, // Multiple spaces
          { type: "COMMENT_LINE", value: "// Campo para indicar si está activo (verdadero/falso)" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Fin de la definición del record TEstudiante" },
        ],
        indentation: 0, // Indentation level 0
      },
      { tokens: [], indentation: 0 }, // Empty line
      {
        tokens: [{ type: "COMMENT_LINE", value: "// --- Sección VAR donde se declaran variables del tipo record ---" }],
        indentation: 0,
      },
      {
        tokens: [{ type: "KEYWORD", value: "var" }],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno1" },
          whiteSpace,
          { type: "DELIMITER_COLON", value: ":" },
          whiteSpace,
          { type: "IDENTIFIER", value: "TEstudiante" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Declara una variable 'alumno1' del tipo TEstudiante" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno2" },
          whiteSpace,
          { type: "DELIMITER_COLON", value: ":" },
          whiteSpace,
          { type: "IDENTIFIER", value: "TEstudiante" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Declara otra variable 'alumno2'" },
        ],
        indentation: 0, // Indentation level 1
      },
      { tokens: [], indentation: 0 }, // Empty line
      {
        tokens: [{ type: "COMMENT_LINE", value: "// --- Bloque principal del programa ---" }],
        indentation: 0,
      },
      {
        tokens: [{ type: "KEYWORD", value: "begin" }],
        indentation: 0,
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "ClrScr" }, // Not a keyword in the list
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      { tokens: [], indentation: 0 }, // Empty line
      {
        tokens: [{ type: "COMMENT_LINE", value: "// --- Asignar valores a los campos de alumno1 ---" }],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          {
            type: "COMMENT_LINE",
            value: "// Se accede a cada campo usando el nombre de la variable, un punto (.), y el nombre del campo",
          },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "legajo" },
          whiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          whiteSpace,
          { type: "NUMBER_INTEGER", value: "12345" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "nombre" },
          whiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          whiteSpace,
          { type: "STRING_LITERAL", value: "Carlos Santana" }, // Value without quotes
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "promedio" },
          whiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          whiteSpace,
          { type: "NUMBER_REAL", value: "8.75" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "activo" },
          whiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          whiteSpace,
          { type: "BOOLEAN_LITERAL", value: "True" }, // Assuming case-insensitivity -> true
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      { tokens: [], indentation: 0 }, // Empty line
      {
        tokens: [
          { type: "COMMENT_LINE", value: "// --- Asignar valores a alumno2 (copiando alumno1 y modificando) ---" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno2" },
          whiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Puedes asignar un record completo a otro" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno2" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "legajo" },
          whiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          whiteSpace,
          { type: "NUMBER_INTEGER", value: "12346" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Modificamos el legajo para alumno2" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno2" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "nombre" },
          whiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          whiteSpace,
          { type: "STRING_LITERAL", value: "Juana Molina" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "alumno2" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "promedio" },
          whiteSpace,
          { type: "OPERATOR_ASSIGN", value: ":=" },
          whiteSpace,
          { type: "NUMBER_REAL", value: "9.10" }, // Or NUMBER_REAL "9.1"? Assuming 9.10 is valid
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      { tokens: [], indentation: 0 }, // Empty line
      {
        tokens: [{ type: "COMMENT_LINE", value: "// --- Mostrar los datos de alumno1 ---" }],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" }, // Not a keyword
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Datos del Alumno 1:" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Legajo..: " },
          { type: "DELIMITER_COMMA", value: "," },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "legajo" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Nombre..: " },
          { type: "DELIMITER_COMMA", value: "," },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "nombre" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Promedio: " },
          { type: "DELIMITER_COMMA", value: "," },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "promedio" },
          { type: "DELIMITER_COLON", value: ":" },
          { type: "NUMBER_INTEGER", value: "0" },
          { type: "DELIMITER_COLON", value: ":" },
          { type: "NUMBER_INTEGER", value: "2" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Formato con 2 decimales" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Activo..: " },
          { type: "DELIMITER_COMMA", value: "," },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno1" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "activo" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Línea en blanco" },
        ],
        indentation: 0, // Indentation level 1
      },
      { tokens: [], indentation: 0 }, // Empty line
      {
        tokens: [{ type: "COMMENT_LINE", value: "// --- Mostrar los datos de alumno2 ---" }],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Datos del Alumno 2:" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Legajo..: " },
          { type: "DELIMITER_COMMA", value: "," },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno2" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "legajo" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Nombre..: " },
          { type: "DELIMITER_COMMA", value: "," },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno2" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "nombre" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Promedio: " },
          { type: "DELIMITER_COMMA", value: "," },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno2" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "promedio" },
          { type: "DELIMITER_COLON", value: ":" },
          { type: "NUMBER_INTEGER", value: "0" },
          { type: "DELIMITER_COLON", value: ":" },
          { type: "NUMBER_INTEGER", value: "2" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "IDENTIFIER", value: "Writeln" },
          { type: "DELIMITER_LPAREN", value: "(" },
          { type: "STRING_LITERAL", value: "Activo..: " },
          { type: "DELIMITER_COMMA", value: "," },
          whiteSpace,
          { type: "IDENTIFIER", value: "alumno2" },
          { type: "DELIMITER_DOT", value: "." },
          { type: "IDENTIFIER", value: "activo" },
          { type: "DELIMITER_RPAREN", value: ")" },
          { type: "DELIMITER_SEMICOLON", value: ";" },
        ],
        indentation: 0, // Indentation level 1
      },
      { tokens: [], indentation: 0 }, // Empty line
      {
        tokens: [
          { type: "IDENTIFIER", value: "ReadKey" }, // Not a keyword
          { type: "DELIMITER_SEMICOLON", value: ";" },
          whiteSpace,
          { type: "COMMENT_LINE", value: "// Espera a que el usuario presione una tecla" },
        ],
        indentation: 0, // Indentation level 1
      },
      {
        tokens: [
          { type: "KEYWORD", value: "end" },
          { type: "DELIMITER_DOT", value: "." },
        ],
        indentation: 0, // Indentation level 0
      },
    ];

    expect(formatPascalCode(input)).toEqual(expected);
  });
});
