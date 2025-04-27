import { PascalToken } from "pascal-tokenizer";
import { FormattedPascalLine, ProgramStructureState } from "../shared/types";

class StateManager {
  private currentToken: PascalToken;
  private nextToken: PascalToken | null;
  private currentState: ProgramStructureState;
  private nextState: ProgramStructureState;
  constructor() {}
}

export { StateManager };
