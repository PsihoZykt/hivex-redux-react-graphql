import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {taskSlice} from "./slices/taskSlice";

const reducer = combineReducers({
  task: taskSlice.reducer,
})
export const store = configureStore({reducer})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
