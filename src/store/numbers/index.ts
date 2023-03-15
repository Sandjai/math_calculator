import { createSlice } from "@reduxjs/toolkit";
import {dragStatuses} from '../constants/dragStatuses'
const initialState = {

    value: ""

};

export const numbersSlice = createSlice({
  name: "numbers",
  initialState,

  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
   

  },
});
