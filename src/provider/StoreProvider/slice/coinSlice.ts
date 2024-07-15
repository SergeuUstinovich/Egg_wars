import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinType } from "../../../types/CoinType";

const initialState: CoinType = {
    coin: 0
}

export const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        addCoinStore: (state, action: PayloadAction<number>) => {
            state.coin += action.payload;
        },
    }
})

export const {actions: coinActions} = coinSlice
export const {reducer: coinReducer} = coinSlice