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

import { tokenizePascal } from "./tokenizer";

// Example Pascal code
const pascalCode = `
program HelloWorld;
var
  message: string;
begin
  message := 'Hello, World!';
  writeln(message);
end.
`;


const tokenizeCode = tokenizePascal(pascalCode)
console.log(tokenizeCode)