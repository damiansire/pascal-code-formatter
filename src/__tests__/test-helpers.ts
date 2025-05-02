import { PROGRAM, WhiteSpace, DELIMITER_SEMICOLON, VAR, DELIMITER_COLON, KEYWORD_INTEGER, KEYWORD_BEGIN } from "../shared/elements";
import { LineType, StructuralType, FormattedPascalLine } from "../shared/types";
import { PascalToken, TokenType } from "pascal-tokenizer";

const createFormattedLine = (
    tokens: PascalToken[],
    indentation: number,
    type: LineType,
    structuralType: StructuralType
): FormattedPascalLine => ({
    tokens,
    indentation,
    type,
    structuralType
});

const createProgramLine = (name: string): FormattedPascalLine => createFormattedLine(
    [PROGRAM, WhiteSpace, { type: "IDENTIFIER" as TokenType, value: name }, DELIMITER_SEMICOLON],
    0,
    "PROGRAM_NAME_DECLARATION",
    "PROGRAM_NAME_DECLARATION"
);

const createVarDeclarationLine = (): FormattedPascalLine => createFormattedLine(
    [VAR],
    0,
    "VAR_DECLARATION",
    "VARS_DECLARATION"
);

const createVarDefinitionLine = (name: string): FormattedPascalLine => createFormattedLine(
    [{ type: "IDENTIFIER" as TokenType, value: name }, DELIMITER_COLON, WhiteSpace, KEYWORD_INTEGER, DELIMITER_SEMICOLON],
    1,
    "DECLARATION",
    "VARS_DECLARATION"
);

const createBeginLine = (indent: number = 0): FormattedPascalLine => createFormattedLine(
    [KEYWORD_BEGIN],
    indent,
    "BEGIN_DECLARATION",
    "CODE_EXECUTION"
);

const createEndLine = (indent: number = 0, withDot: boolean = false): FormattedPascalLine => createFormattedLine(
    [
        { type: "KEYWORD" as TokenType, value: "end" },
        ...(withDot ? [{ type: "DELIMITER_DOT" as TokenType, value: "." }] : [])
    ],
    indent,
    "END_DECLARATION",
    "CODE_EXECUTION"
);

const createWritelnLine = (message: string, comment?: string, indent: number = 1): FormattedPascalLine => createFormattedLine(
    [
        { type: "IDENTIFIER" as TokenType, value: "writeln" },
        { type: "DELIMITER_LPAREN" as TokenType, value: "(" },
        { type: "STRING_LITERAL" as TokenType, value: message },
        { type: "DELIMITER_RPAREN" as TokenType, value: ")" },
        DELIMITER_SEMICOLON,
        ...(comment ? [WhiteSpace, { type: "COMMENT_STAR" as TokenType, value: `(* ${comment} *)` }] : [])
    ],
    indent,
    "UNKNOWN",
    "CODE_EXECUTION"
);

const createIfStatementLine = (condition: string, comment?: string): FormattedPascalLine => createFormattedLine(
    [
        { type: "KEYWORD" as TokenType, value: "if" },
        WhiteSpace,
        { type: "IDENTIFIER" as TokenType, value: "temperaturaActual" },
        WhiteSpace,
        { type: "OPERATOR_GREATER_EQUAL" as TokenType, value: ">=" },
        WhiteSpace,
        { type: "NUMBER_INTEGER" as TokenType, value: "25" },
        WhiteSpace,
        { type: "KEYWORD" as TokenType, value: "then" },
        ...(comment ? [WhiteSpace, { type: "COMMENT_STAR" as TokenType, value: `(* ${comment} *)` }] : [])
    ],
    1,
    "IF_STATEMENT",
    "CODE_EXECUTION"
);

const createElseStatementLine = (): FormattedPascalLine => createFormattedLine(
    [{ type: "KEYWORD" as TokenType, value: "else" }],
    1,
    "UNKNOWN",
    "CODE_EXECUTION"
);

export {
    createFormattedLine,
    createProgramLine,
    createVarDeclarationLine,
    createVarDefinitionLine,
    createBeginLine,
    createEndLine,
    createWritelnLine,
    createIfStatementLine,
    createElseStatementLine,
    type PascalToken,
    type TokenType
};
