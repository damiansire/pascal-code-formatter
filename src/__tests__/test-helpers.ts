import { PROGRAM, WhiteSpace, DELIMITER_SEMICOLON, VAR, DELIMITER_COLON, KEYWORD_INTEGER, KEYWORD_BEGIN } from "../shared/elements";
import { LineType, StructuralType, FormattedPascalLine } from "../shared/types";

// Helper functions to make tests more readable
const line = (tokens: any[], indentation: number, type: LineType, structuralType: StructuralType): FormattedPascalLine => ({
    tokens,
    indentation,
    type,
    structuralType
});

const program = (name: string) => line(
    [PROGRAM, WhiteSpace, { type: "IDENTIFIER", value: name }, DELIMITER_SEMICOLON],
    0,
    "PROGRAM_NAME_DECLARATION",
    "PROGRAM_NAME_DECLARATION"
);

const varDecl = () => line(
    [VAR],
    0,
    "VAR_DECLARATION",
    "VARS_DECLARATION"
);

const varDef = (name: string) => line(
    [{ type: "IDENTIFIER", value: name }, DELIMITER_COLON, WhiteSpace, KEYWORD_INTEGER, DELIMITER_SEMICOLON],
    1,
    "DECLARATION",
    "VARS_DECLARATION"
);

const begin = (indent: number = 0) => line(
    [KEYWORD_BEGIN],
    indent,
    "BEGIN_DECLARATION",
    "CODE_EXECUTION"
);

const end = (indent: number = 0, withDot: boolean = false) => line(
    [
        { type: "KEYWORD", value: "end" },
        ...(withDot ? [{ type: "DELIMITER_DOT", value: "." }] : [])
    ],
    indent,
    "END_DECLARATION",
    "CODE_EXECUTION"
);

const writeln = (message: string, comment?: string, indent: number = 1) => line(
    [
        { type: "IDENTIFIER", value: "writeln" },
        { type: "DELIMITER_LPAREN", value: "(" },
        { type: "STRING_LITERAL", value: message },
        { type: "DELIMITER_RPAREN", value: ")" },
        DELIMITER_SEMICOLON,
        ...(comment ? [WhiteSpace, { type: "COMMENT_STAR", value: `(* ${comment} *)` }] : [])
    ],
    indent,
    "UNKNOWN",
    "CODE_EXECUTION"
);

const ifStatement = (condition: string, comment?: string) => line(
    [
        { type: "KEYWORD", value: "if" },
        WhiteSpace,
        { type: "IDENTIFIER", value: "temperaturaActual" },
        WhiteSpace,
        { type: "OPERATOR_GREATER_EQUAL", value: ">=" },
        WhiteSpace,
        { type: "NUMBER_INTEGER", value: "25" },
        WhiteSpace,
        { type: "KEYWORD", value: "then" },
        ...(comment ? [WhiteSpace, { type: "COMMENT_STAR", value: `(* ${comment} *)` }] : [])
    ],
    1,
    "IF_STATEMENT",
    "CODE_EXECUTION"
);

const elseStatement = () => line(
    [{ type: "KEYWORD", value: "else" }],
    1,
    "UNKNOWN",
    "CODE_EXECUTION"
);

export { line, program, varDecl, varDef, begin, end, writeln, ifStatement, elseStatement };
