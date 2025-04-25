import { PascalFormatter } from '../formatter';

describe('PascalFormatter', () => {
    let formatter: PascalFormatter;

    beforeEach(() => {
        formatter = new PascalFormatter();
    });

    test('should format a simple program', () => {
        const input = `
program HelloWorld;
begin
  writeln('Hello, World!');
end.
`;
        const expected = `
program HelloWorld;
begin
  writeln('Hello, World!');
end.
`;
        expect(formatter.format(input)).toBe(expected.trim());
    });

    test('should handle nested blocks', () => {
        const input = `
program NestedBlocks;
begin
  if true then
  begin
    writeln('Inside if');
  end;
end.
`;
        const expected = `
program NestedBlocks;
begin
  if true then
  begin
    writeln('Inside if');
  end;
end.
`;
        expect(formatter.format(input)).toBe(expected.trim());
    });

    test('should handle procedures and functions', () => {
        const input = `
program Procedures;
procedure SayHello;
begin
  writeln('Hello');
end;
function Add(a, b: integer): integer;
begin
  result := a + b;
end;
begin
  SayHello;
end.
`;
        const expected = `
program Procedures;
procedure SayHello;
begin
  writeln('Hello');
end;
function Add(a, b: integer): integer;
begin
  result := a + b;
end;
begin
  SayHello;
end.
`;
        expect(formatter.format(input)).toBe(expected.trim());
    });

    test('should handle variable declarations', () => {
        const input = `
program Variables;
var
  x: integer;
  y: string;
begin
  x := 10;
  y := 'test';
end.
`;
        const expected = `
program Variables;
var
  x: integer;
  y: string;
begin
  x := 10;
  y := 'test';
end.
`;
        expect(formatter.format(input)).toBe(expected.trim());
    });

    test('should handle custom indentation size', () => {
        const formatter = new PascalFormatter(4);
        const input = `
program CustomIndent;
begin
  writeln('test');
end.
`;
        const expected = `
program CustomIndent;
begin
    writeln('test');
end.
`;
        expect(formatter.format(input)).toBe(expected.trim());
    });
}); 