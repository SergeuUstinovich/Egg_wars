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
    }
})

export const {actions: coinActions} = coinSlice
export const {reducer: coinReducer} = coinSlice