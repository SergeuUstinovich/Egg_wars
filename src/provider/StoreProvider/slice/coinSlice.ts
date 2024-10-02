import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinScheme, CoinType } from "../../../types/CoinType";

const initialState: CoinScheme = {}

export const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        addCoinStore: (state, action: PayloadAction<CoinType>) => {
            state.infoUser = action.payload
        },
        updateCoinStore: (state, action: PayloadAction<CoinType>) => {
            state.infoUser = {...state.infoUser, ...action.payload}
        },
        updateCoinSumm: (state, action: PayloadAction<number>) => {
            if(state.infoUser) {
                state.infoUser.money += action.payload
            }  
        },
        updateCoinMinus: (state, action: PayloadAction<number>) => {
            if(state.infoUser) {
                state.infoUser.money -= state.infoUser.money - action.payload
            }
        }
    }
})

export const {actions: coinActions} = coinSlice
export const {reducer: coinReducer} = coinSlice