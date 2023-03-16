import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { displaySlice } from "./display";

import { calculatorSlice } from "./calculator";

const rootReducer = combineReducers({
  display: displaySlice.reducer,

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
