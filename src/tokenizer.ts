export function tokenizePascal(code: string) {
    const tokens: Array<{ type: string; value: any }> = [];
    let currentIndex = 0;

    // Common Pascal keywords (case-insensitive)
    const keywords = new Set([
        'program', 'const', 'var', 'begin', 'end', 'if', 'then', 'else',
        'while', 'do', 'for', 'to', 'downto', 'repeat', 'until', 'case',
        'of', 'record', 'array', 'procedure', 'function', 'type',
        'integer', 'real', 'char', 'string', 'boolean', // Common types
        'uses', 'label', 'goto',
        'true', 'false' // Boolean literals treated as keywords
    ]);

    // Simple map of single-character operators/delimiters
    // Added ^, @, [, ]
    const singleCharTokens: { [key: string]: string } = {
        ';': 'DELIMITER_SEMICOLON',
        ',': 'DELIMITER_COMMA',
        '.': 'DELIMITER_DOT',
        '(': 'DELIMITER_LPAREN',
        ')': 'DELIMITER_RPAREN',
        '[': 'DELIMITER_LBRACKET',
        ']': 'DELIMITER_RBRACKET',
        '+': 'OPERATOR_PLUS',
        '-': 'OPERATOR_MINUS',
        '*': 'OPERATOR_MULTIPLY',
        '/': 'OPERATOR_DIVIDE',
        '=': 'OPERATOR_EQUAL',
        '<': 'OPERATOR_LESS', // Could be part of <= or <>
        '>': 'OPERATOR_GREATER',// Could be part of >=
        ':': 'DELIMITER_COLON', // Could be part of :=
        '^': 'OPERATOR_POINTER',
        '@': 'OPERATOR_ADDRESSOF'
    };

    // Useful regular expressions
    const whitespaceRegex = /\s/;
    const letterRegex = /[a-z]/i;
    const digitRegex = /[0-9]/;
    const identifierCharRegex = /[a-z0-9_]/i; // Allows _

    while (currentIndex < code.length) {
        let char = code[currentIndex];
        let nextChar = code[currentIndex + 1] || ''; // Simple lookahead

        // 1. Ignore Whitespace
        if (whitespaceRegex.test(char)) {
            currentIndex++;
            continue;
        }

        // 2. Handle Comments (CHECK BEFORE SIMPLE OPERATORS)
        // Comment type { ... }
        if (char === '{') {
            currentIndex++;
            let commentEnd = code.indexOf('}', currentIndex);
            if (commentEnd === -1) {
                console.error("Error: Unclosed '{' comment.");
                currentIndex = code.length;
            } else {
                currentIndex = commentEnd + 1;
            }
            continue;
        }
        // Comment type (* ... *)
        if (char === '(' && nextChar === '*') {
            currentIndex += 2;
            let commentEnd = code.indexOf('*)', currentIndex);
            if (commentEnd === -1) {
                console.error("Error: Unclosed '(*' comment.");
                currentIndex = code.length;
            } else {
                currentIndex = commentEnd + 2;
            }
            continue;
        }
        // Comment type // ... until end of line (Common in Delphi/FPC)
        if (char === '/' && nextChar === '/') {
            currentIndex += 2;
            while (currentIndex < code.length && code[currentIndex] !== '\n') {
                currentIndex++;
            }
            // currentIndex is now at \n or end of code
            continue;
        }

        // 3. Handle Compound Operators and Ranges (CHECK BEFORE SIMPLE ONES)
        if (char === ':' && nextChar === '=') {
            tokens.push({ type: 'OPERATOR_ASSIGN', value: ':=' });
            currentIndex += 2;
            continue;
        }
        if (char === '<' && nextChar === '=') {
            tokens.push({ type: 'OPERATOR_LESS_EQUAL', value: '<=' });
            currentIndex += 2;
            continue;
        }
        if (char === '>' && nextChar === '=') {
            tokens.push({ type: 'OPERATOR_GREATER_EQUAL', value: '>=' });
            currentIndex += 2;
            continue;
        }
        if (char === '<' && nextChar === '>') {
            tokens.push({ type: 'OPERATOR_NOT_EQUAL', value: '<>' });
            currentIndex += 2;
            continue;
        }
        if (char === '.' && nextChar === '.') {
            tokens.push({ type: 'OPERATOR_RANGE', value: '..' });
            currentIndex += 2;
            continue;
        }

        // 4. Handle String Literals (CHECK BEFORE IDENTIFIERS)
        if (char === "'") {
            let stringValue = '';
            let lookaheadIndex = currentIndex + 1; // Skip initial quote
            while (lookaheadIndex < code.length) {
                let strChar = code[lookaheadIndex];
                if (strChar === "'") {
                    // Check if it's an escaped quote ('')
                    if (code[lookaheadIndex + 1] === "'") {
                        stringValue += "'"; // Add a single quote
                        lookaheadIndex += 2; // Skip both quotes
                    } else {
                        // End of string
                        lookaheadIndex++; // Skip final quote
                        break;
                    }
                } else {
                    stringValue += strChar;
                    lookaheadIndex++;
                }
            }
            if (lookaheadIndex > code.length && code[lookaheadIndex - 1] !== "'") { // Basic check
                console.error("Error: Unclosed string literal.");
            }
            tokens.push({ type: 'STRING_LITERAL', value: stringValue });
            currentIndex = lookaheadIndex;
            continue;
        }

        // 5. Handle Identifiers and Keywords
        if (letterRegex.test(char)) {
            let value = char;
            let lookaheadIndex = currentIndex + 1;
            while (lookaheadIndex < code.length && identifierCharRegex.test(code[lookaheadIndex])) {
                value += code[lookaheadIndex];
                lookaheadIndex++;
            }
            currentIndex = lookaheadIndex;

            const lowerCaseValue = value.toLowerCase();
            if (keywords.has(lowerCaseValue)) {
                // You could have specific types like 'BOOLEAN_LITERAL' if preferred
                if (lowerCaseValue === 'true' || lowerCaseValue === 'false') {
                    tokens.push({ type: 'BOOLEAN_LITERAL', value: lowerCaseValue === 'true' });
                } else {
                    tokens.push({ type: 'KEYWORD', value: value }); // Keep original case?
                }
            } else {
                tokens.push({ type: 'IDENTIFIER', value: value });
            }
            continue;
        }

        // 6. Handle Numbers (Integers and Reals)
        if (digitRegex.test(char) || (char === '.' && digitRegex.test(nextChar))) { // Allow starting with . for reals e.g. .5
            let value = '';
            let isReal = false;
            let lookaheadIndex = currentIndex;

            // Allow starting with dot if followed by digit
            if (code[lookaheadIndex] === '.') {
                value += '.';
                lookaheadIndex++;
                isReal = true;
            }

            while (lookaheadIndex < code.length && digitRegex.test(code[lookaheadIndex])) {
                value += code[lookaheadIndex];
                lookaheadIndex++;
            }

            // Decimal part if didn't start with dot
            if (!isReal && lookaheadIndex < code.length && code[lookaheadIndex] === '.') {
                // Check it's not part of ..
                if (code[lookaheadIndex + 1] !== '.') {
                    isReal = true;
                    value += '.';
                    lookaheadIndex++;
                    // Read digits after dot
                    while (lookaheadIndex < code.length && digitRegex.test(code[lookaheadIndex])) {
                        value += code[lookaheadIndex];
                        lookaheadIndex++;
                    }
                }
                // If it was '..', main loop will detect it in next iteration
            }

            // (Could add scientific notation 'E' or 'e' logic here)

            if (isReal) {
                // Make sure it's not just an isolated '.'
                if (value !== '.') {
                    tokens.push({ type: 'NUMBER_REAL', value: parseFloat(value) });
                } else {
                    // It was a simple '.', handle as delimiter below
                    lookaheadIndex = currentIndex; // Reset to be detected by singleCharTokens
                }
            } else {
                tokens.push({ type: 'NUMBER_INTEGER', value: parseInt(value, 10) });
            }

            // Only advance if we actually consumed a number
            if (lookaheadIndex > currentIndex) {
                currentIndex = lookaheadIndex;
                continue;
            }
            // If not consumed (e.g., just '.'), let next block handle it
        }

        // 7. Handle Simple Operators/Delimiters (Last option)
        if (singleCharTokens.hasOwnProperty(char)) {
            tokens.push({ type: singleCharTokens[char], value: char });
            currentIndex++;
            continue;
        }

        // 8. Unknown Character
        console.error(`Error: Unknown character '${char}' at position ${currentIndex}`);
        currentIndex++; // Skip to avoid infinite loops
    }

    tokens.push({ type: 'EOF', value: null });
    return tokens;
}

// --- Usage Example with Complete Code ---
const pascalCode = `
program CompleteDeclarationsExample;

// 1. USES: Specifies the external libraries (units) the program will use.
// uses Crt, SysUtils; // Example

// 2. LABEL: Declares labels for use with GOTO
label
  StartLoop, EndProgram;

// 3. CONST: Defines named constants.
const
  MaxValue = 100;
  InitialMessage = 'Demonstration program started.';
  PI = 3.14159;

// 4. TYPE: Defines custom data types.
type
  TNumericRange = 1..MaxValue; // Subrange
  TColor = (Red, Green, Blue, Yellow); // Enum
  TPerson = record          // Record
    Name: string[40];
    Age: integer;
    FavColor: TColor;
  end;
  PInt = ^integer;          // Pointer

// 5. VAR: Declares global variables.
var
  Counter: integer;
  CurrentValue: TNumericRange;
  ExamplePerson: TPerson;
  MyColor: TColor;
  PointerVar: PInt;
  TargetNumber: integer;
  ExitFlag: boolean = False; // Initialization

// 6. DEFINITION OF PROCEDURES AND FUNCTIONS
procedure ShowMessage(Message: string);
begin
  writeln(Message);
end;

function IsAdult(PersonAge: integer): boolean;
begin
  if PersonAge >= 18 then
    IsAdult := True
  else
    IsAdult := False;
end;

function GetColorName(C: TColor): string;
begin
  case C of
    Red: GetColorName := 'Red';
    Green: GetColorName := 'Green';
    Blue: GetColorName := 'Blue';
    Yellow: GetColorName := 'Yellow';
  else
    GetColorName := 'Unknown';
  end;
end;

// 7. BEGIN ... END. : Main program block.
begin { Main Block Start }
  ShowMessage(InitialMessage);
  writeln('Max: ', MaxValue); (* Another comment *)

  CurrentValue := 50;
  Counter := 0;

  // Use the record
  ExamplePerson.Name := 'Carlos Ruiz'; // String literal
  ExamplePerson.Age := 22;
  ExamplePerson.FavColor := Blue; // Identifier (enum value)
  writeln('Color: ', GetColorName(ExamplePerson.FavColor));

  if IsAdult(ExamplePerson.Age) then
    ShowMessage(ExamplePerson.Name + ' is an adult.')
  else
    ShowMessage(ExamplePerson.Name + ' is a minor.');

  // Pointer usage
  TargetNumber := 10;
  PointerVar := @TargetNumber; // Address-of
  writeln('Ptr value: ', PointerVar^); // Dereference
  PointerVar^ := PointerVar^ + 5;
  writeln('Target Num: ', TargetNumber);

  // GOTO example
  ShowMessage('Starting loop');
StartLoop: // Label
  Counter := Counter + 1;
  writeln('Iteration: ', Counter);
  if Counter >= 3 then
    goto EndProgram; // Goto statement

  goto StartLoop;

EndProgram: // Label
  ShowMessage('Loop finished.');

  ShowMessage('--- End ---');
  // readln;
end. // End of Program
`;

// Export the example code for testing
export const examplePascalCode = pascalCode; 