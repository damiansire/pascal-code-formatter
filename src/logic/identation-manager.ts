import { CounterweightStack, CounterweightRule } from "counterweight-stack";
import { deepEqual } from "objects-deep-compare";
import { PascalToken } from "pascal-tokenizer";
import { Stack } from "../shared/stack";

const beginToken: PascalToken = { type: "KEYWORD", value: "begin" };
const endToken: PascalToken = { type: "KEYWORD", value: "end" };
const varToken: PascalToken = { type: "KEYWORD", value: "var" };

const rules: CounterweightRule<PascalToken>[] = [
  {
    mainElement: beginToken,
    counterweights: [endToken],
  },
  {
    mainElement: varToken,
    counterweights: [beginToken],
  },
];

class IdentationManager {
  private indentationStack: CounterweightStack<PascalToken>;
  constructor() {
    this.indentationStack = new CounterweightStack<PascalToken>(rules);
  }
  evaluateLineIndentation(tokens: PascalToken[]) {
    const currentIndent = this.indentationStack.size();
    for (const token of tokens) {
      this.indentationStack.pop(token);
    }
    for (const token of tokens) {
      if (deepEqual(token, varToken)) {
        this.indentationStack.push(token);
      }
    }
    return currentIndent;
  }
}

export { IdentationManager };
