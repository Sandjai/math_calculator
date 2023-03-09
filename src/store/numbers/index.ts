import { createSlice } from "@reduxjs/toolkit";
import {dragStatuses} from '../constants/dragStatuses'
const initialState = {
    status: dragStatuses.dropped,
    value: ""

};

export const numbersSlice = createSlice({
  name: "numbers",
  initialState,

  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
    isTaken: (state) => {
        state.status = dragStatuses.taken;
      },
      inProgress: (state, action) => {
        state.status = dragStatuses.inProgress;
      },
      isDropped: (state) => {
        state.status = dragStatuses.dropped;
      },


  },
});
