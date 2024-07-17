import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinSheme, CoinType } from "../../../types/CoinType";

const initialState: CoinSheme = {}

export const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        addCoinStore: (state, action: PayloadAction<CoinType>) => {
            state.infoUser = action.payload
        },
    }
})

export const {actions: coinActions} = coinSlice
export const {reducer: coinReducer} = coinSlice