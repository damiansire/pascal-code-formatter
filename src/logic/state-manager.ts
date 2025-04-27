import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine, ProgramStructureState } from "../shared/types";

class StateManager {
  prevState: ProgramStructureState = ProgramStructureState.Initial;
  currentState: ProgramStructureState = ProgramStructureState.Initial;
  nextState: ProgramStructureState = ProgramStructureState.Initial;
  constructor() {}
  processToken(prevToken: PascalToken, currentToken: PascalToken, nextToken: PascalToken) {
    this.prevState = this.currentState;
    this.currentState = this.getTokenState(currentToken);
    this.nextState = this.getTokenState(nextToken);
  }

  needAddNewLine() {
    if (this.currentState === ProgramStructureState.Initial) {
      return false;
    }
    return this.currentState !== this.nextState;
  }

  getTokenState(token: PascalToken): ProgramStructureState {
    if (token.type === "KEYWORD") {
      if (token.value === "program") {
        return ProgramStructureState.ProgramNameDeclaration;
      } else if (token.value === "var") {
        return ProgramStructureState.VarDeclaration;
      } else if (token.value === "begin") {
        return ProgramStructureState.BeginBlock;
      } else if (token.value === "end") {
        return ProgramStructureState.EndBlock;
      } else if (token.value === "procedure") {
        return ProgramStructureState.ProcedureDefinition;
      } else if (token.value === "function") {
        return ProgramStructureState.FunctionDefinition;
      }
    }
    return ProgramStructureState.Unknown;
  }
}

export { StateManager };
