import { PascalFormatter } from './formatter';

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

// Create formatter instance
const formatter = new PascalFormatter();

// Format the code
const formattedCode = formatter.format(pascalCode);

// Print the result
console.log('Original code:');
console.log(pascalCode);
console.log('\nFormatted code:');
console.log(formattedCode); 