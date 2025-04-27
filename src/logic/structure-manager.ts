import { PascalToken } from "pascal-tokenizer";
import { ProgramStructureState } from "../shared/types";

class StructureManager {
  prevState: ProgramStructureState = ProgramStructureState.Initial;
  currentState: ProgramStructureState = ProgramStructureState.Initial;
  nextState: ProgramStructureState = ProgramStructureState.Initial;
  constructor() {}
  processToken(prevToken: PascalToken, currentToken: PascalToken, nextToken: PascalToken) {
    const newState = this.getTokenState(currentToken);
    if (newState !== ProgramStructureState.Unknown) {
      this.prevState = this.currentState;
      this.currentState = newState;
    }
    const newNextState = this.getTokenState(nextToken);
    if (newNextState !== ProgramStructureState.Unknown) {
      this.nextState = newNextState;
    }
  }

  needAddEmptyLine() {
    if (this.currentState === ProgramStructureState.Initial || this.nextState === ProgramStructureState.Initial) {
      return false;
    }
    return this.currentState !== this.nextState;
  }

  getTokenState(token: PascalToken): ProgramStructureState {
    if (token?.type === "KEYWORD") {
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

export { StructureManager };
