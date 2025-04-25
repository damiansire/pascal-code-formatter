program CompleteDeclarationsExample;

// 1. USES: Specifies the external libraries (units) the program will use.
// (In very basic standard Pascal it might not be necessary, but it's common in Turbo Pascal, Free Pascal, Delphi)
// uses Crt, SysUtils; // Example: uncomment if you use Free Pascal/Delphi and want functions from these units

// 2. LABEL: Declares labels for use with GOTO (its use is generally discouraged).
label
  StartLoop, EndProgram;

// 3. CONST: Defines named constants.
const
  MaxValue = 100;
  InitialMessage = 'Demonstration program started.';
  PI = 3.14159;

// 4. TYPE: Defines custom data types.
type
  TNumericRange = 1..MaxValue; // Subrange based on a constant
  TColor = (Red, Green, Blue, Yellow); // Enumerated type
  TPerson = record          // Record type (struct)
    Name: string[40];
    Age: integer;
    FavColor: TColor;
  end;
  PInt = ^integer;          // Pointer type to integer

// 5. VAR: Declares the global variables of the program.
var
  Counter: integer;
  CurrentValue: TNumericRange;
  ExamplePerson: TPerson;
  MyColor: TColor;
  PointerVar: PInt;
  TargetNumber: integer;
  ExitFlag: boolean = False; // Some Pascal versions allow initialization here

// --- This is where you define your own procedures and functions ---
// --- (Between VAR and the main BEGIN) ---

// 6. DEFINITION OF PROCEDURES AND FUNCTIONS

// Procedure: Performs an action, does not return a value.
procedure ShowMessage(Message: string);
begin
  writeln(Message);
end;

// Procedure: Works with a defined type (record)
procedure InitializePerson(var P: TPerson; InitialName: string; InitialAge: integer; InitialColor: TColor);
begin
  P.Name := InitialName;
  P.Age := InitialAge;
  P.FavColor := InitialColor;
end;

// Function: Performs a calculation/action and returns a value.
function IsAdult(PersonAge: integer): boolean;
begin
  if PersonAge >= 18 then
    IsAdult := True // This is how the return value is assigned in Pascal
  else
    IsAdult := False;
end;

// Function: Uses a defined type (enumerated)
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

// --- END OF PROCEDURE AND FUNCTION DEFINITIONS ---

// 7. BEGIN ... END. : Main program block.
begin
  // Use a constant and call a procedure
  ShowMessage(InitialMessage);
  writeln('Maximum allowed value: ', MaxValue);
  writeln;

  // Use defined variables and types
  CurrentValue := 50; // Valid because 50 is in the range 1..MaxValue
  Counter := 0;

  // Initialize and use the record
  InitializePerson(ExamplePerson, 'Carlos Ruiz', 22, Blue); // Kept 'Carlos Ruiz' as it's data
  ShowMessage('Person data:');
  writeln('  Name: ', ExamplePerson.Name);
  writeln('  Age: ', ExamplePerson.Age);
  // Call function that uses the enumerated type
  writeln('  Favorite Color: ', GetColorName(ExamplePerson.FavColor));

  // Call the boolean function
  if IsAdult(ExamplePerson.Age) then
    ShowMessage(ExamplePerson.Name + ' is an adult.')
  else
    ShowMessage(ExamplePerson.Name + ' is a minor.');
  writeln;

  // Basic pointer usage
  TargetNumber := 10;
  PointerVar := @TargetNumber; // PointerVar points to the address of TargetNumber
  ShowMessage('Pointer usage:');
  writeln('  Initial value of TargetNumber: ', TargetNumber);
  writeln('  Value pointed to by PointerVar: ', PointerVar^); // ^ is used to access the value
  PointerVar^ := PointerVar^ + 5; // Modifies the value of TargetNumber through the pointer
  writeln('  Modified value of TargetNumber: ', TargetNumber);
  writeln;

  // Example of LABEL and GOTO usage (simulating a small loop)
  ShowMessage('Starting loop with GOTO (up to 3)');
StartLoop: // Start label
  Counter := Counter + 1;
  writeln('  Iteration number: ', Counter);
  if Counter >= 3 then
    goto EndProgram; // Jump to the end label

  // More loop code would go here...
  goto StartLoop; // Go back to the start of the loop

EndProgram: // End label
  ShowMessage('Loop with GOTO finished.');
  writeln;

  ShowMessage('--- End of demonstration ---');

  // readln; // Uncomment to pause the console at the end if necessary
end.