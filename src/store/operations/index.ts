import { createSlice } from "@reduxjs/toolkit";
import {dragStatuses} from '../constants/dragStatuses'
const initialState = {

    value: ""

};

export const operationsSlice = createSlice({
  name: "operations",
  initialState,

  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },


  },
});
