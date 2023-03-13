import { createSlice } from "@reduxjs/toolkit";

const initialState = {   
    height: ""
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,

  reducers: {
    updateHeight: (state, action) => {
      state.height = action.payload;
    },
  },
});
