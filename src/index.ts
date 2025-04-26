import { tokenizePascal, PascalToken, TokenType } from "pascal-tokenizer";
import { formatPascalCode } from "./formatter";

// Example Pascal code
const pascalCode = `
program HelloWorld;

var
  edad: integer;      (* Para números enteros *)
  nombre: string;       (* Para texto *)
  altura: real;         (* Para números con decimales *)
  esEstudiante: boolean;    (* Para verdadero/falso *)

begin
  edad := 20;
  nombre := 'Juan';
  altura := 1.75;
  esEstudiante := True;

  write('Introduce tu nombre: '); (* Muestra mensaje sin saltar línea *)
  readln(nombreUsuario);         (* Lee el texto introducido *)

  write('Introduce tu edad: ');
  readln(edadUsuario);           (* Lee el número introducido *)

  writeln; (* Salto de línea *)
  writeln('Hola, ', nombreUsuario, '. Tienes ', edadUsuario, ' años.'); (* Muestra el resultado *)

end.`;

const tokenizeCode = tokenizePascal(pascalCode, false);
const formatCode = formatPascalCode(tokenizeCode);

console.log(formatCode);
