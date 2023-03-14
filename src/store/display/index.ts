import { createSlice } from "@reduxjs/toolkit";
import {dragStatuses} from '../constants/dragStatuses'
import { elementsData } from "../../components/constants/elementsSettings";
const initialState = {
    status: dragStatuses.dropped,
    value: elementsData.Display

};

export const displaySlice = createSlice({
  name: "display",
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
