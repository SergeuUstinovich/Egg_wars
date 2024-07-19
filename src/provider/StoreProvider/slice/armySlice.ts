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
        updateArmyPriceBring: (state, action: PayloadAction<number>) => {
            if(state.armyUser) {
                state.armyUser.price_bring_money = action.payload
            }  
        },
        updateArmyLvlBring: (state, action: PayloadAction<number>) => {
            if(state.armyUser) {
                state.armyUser.lvl_bring_money = action.payload
            }  
        }
    }
})

export const {actions: armyActions} = armySlice
export const {reducer: armyReducer} = armySlice