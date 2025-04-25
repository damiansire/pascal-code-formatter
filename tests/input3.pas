var
  userName: string;
  userAge: integer;

begin
  write('Enter your name: '); /* Shows message without line break */
  readln(userName);         /* Reads the entered text */

  write('Enter your age: ');
  readln(userAge);           /* Reads the entered number */

  writeln; /* Line break */
  writeln('Hello, ', userName, '. You are ', userAge, ' years old.'); /* Shows the result */
end.