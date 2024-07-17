import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArmyScheme, ArmyType } from "../../../types/ArmyType";

const initialState: ArmyScheme = {}

export const armySlice = createSlice({
    name: 'army',
    initialState,
    reducers: {
        addArmyStore: (state, action: PayloadAction<ArmyType>) => {
            state.armyUser = action.payload
        },
    }
})

export const {actions: armyActions} = armySlice
export const {reducer: armyReducer} = armySlice