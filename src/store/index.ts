import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { displaySlice } from "./display";
import { numbersSlice } from "./numbers";

import { calculatorSlice } from "./calculator";
import { operationsSlice } from "./operations";

const rootReducer = combineReducers({
  display: displaySlice.reducer,
  numbers: numbersSlice.reducer,
  operations: operationsSlice.reducer,
  calculator: calculatorSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
