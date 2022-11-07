import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainLayoutSlice from "./slice/mainLayoutSlice";


export const rootReducer = combineReducers({
    mainLayoutSlice: mainLayoutSlice
})


export const store = configureStore({
    reducer: rootReducer
})

