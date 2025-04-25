import { PascalFormatter } from '../formatter';

describe('PascalFormatter', () => {
  let formatter: PascalFormatter;

  beforeEach(() => {
    formatter = new PascalFormatter();
  });

  test('should format a simple program', () => {
    const input = `program HelloWorld;`;
    const expected = `program HelloWorld;`;
    expect(formatter.format(input)).toBe(expected);
  });

  /*
    test('should format a simple begin-end program', () => {
      const input = `program HelloWorld; begin end.`;
      const expected = `program HelloWorld;
    begin
    end.`;
      expect(formatter.format(input)).toBe(expected);
    });
  
    test('should format a simple minimized program', () => {
      const input = `program NotAsStupid;const a=5;var alpha,beta:real;begin alpha:=a+b;beta:=b/a;end.`;
      const expected = `program NotAsStupid;
  
  const
    a = 5;
  
  var
    alpha, beta: real;
  
  begin
    alpha := a + b;  // Nota: 'b' no está declarada/definida
    beta := b / a;   // Nota: 'b' no está declarada/definida
  end.`;
      expect(formatter.format(input)).toBe(expected);
    });
  
  
  */
}); 