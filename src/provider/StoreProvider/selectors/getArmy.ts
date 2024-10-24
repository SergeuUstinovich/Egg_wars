import { StateShema } from "../config/StateScheme";

export const getArmy = (state: StateShema) => state.army?.armyUser?.my_army;
export const getArmyAllList = (state: StateShema) =>
  state.army?.armyUser?.all_army;
