import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateShema } from "./StateScheme";
import { coinReducer } from "../slice/coinSlice";


export function createReduxStore(initialState?: StateShema) {

    const rootReducer: ReducersMapObject<StateShema> = {
        coins: coinReducer,
    }

    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    })
}