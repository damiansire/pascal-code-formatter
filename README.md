# Pascal Formatter

A simple Pascal code formatter written in TypeScript. This tool helps format Pascal code by properly indenting blocks and maintaining consistent spacing.

## Features

- Automatic indentation of code blocks
- Proper handling of Pascal keywords (begin, end, procedure, function)
- Configurable indentation size
- Simple and easy to use API

## Installation

```bash
npm install
```

## Usage

```typescript
import { PascalFormatter } from './formatter';

const formatter = new PascalFormatter();
const formattedCode = formatter.format(yourPascalCode);
```

## Development

To build the project:
```bash
npm run build
```

To run the example:
```bash
npm run start
```

For development with automatic rebuild:
```bash
npm run dev
```

## License

ISC 