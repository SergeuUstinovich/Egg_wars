import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateShema } from "./StateScheme";
import { coinReducer } from "../slice/coinSlice";
import { armyReducer } from "../slice/armySlice";


export function createReduxStore(initialState?: StateShema) {

    const rootReducer: ReducersMapObject<StateShema> = {
        coins: coinReducer,
        army: armyReducer
    }

    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    })
}