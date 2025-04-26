import { tokenizePascal, PascalToken, TokenType } from "pascal-tokenizer";
import { formatPascalCode } from "./formatter";
/*import { PascalFormatter } from './formatter';
// Create formatter instance
const formatter = new PascalFormatter();

// Format the code
const formattedCode = formatter.format(pascalCode);

// Print the result
console.log('Original code:');
console.log(pascalCode);
console.log('\nFormatted code:');
console.log(formattedCode); 
*/

// Example Pascal code
const pascalCode = `
program HelloWorld;
var
  message: string; { hola solo estoy provando que tal funciona esto xd }
begin
  message := 'Hello, World!';  (* Muestra un mensaje en pantalla *)
  writeln(message); //esto se lee??
end.
`;

const tokenizeCode = tokenizePascal(pascalCode, false);
const formatCode = formatPascalCode(tokenizeCode);

console.log(formatCode);
