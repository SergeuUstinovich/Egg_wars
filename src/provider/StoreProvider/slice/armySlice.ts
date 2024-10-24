import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArmyKey, ArmyScheme, ArmyType } from "../../../types/ArmyType";

const initialState: ArmyScheme = {};

export const armySlice = createSlice({
  name: "army",
  initialState,
  reducers: {
    addArmyStore: (state, action: PayloadAction<ArmyKey>) => {
      state.armyUser = action.payload;
    },
  },
});

export const { actions: armyActions } = armySlice;
export const { reducer: armyReducer } = armySlice;
