import { StateShema } from "../config/StateScheme";

export const getArmy = (state: StateShema) => state.army?.armyUser;
