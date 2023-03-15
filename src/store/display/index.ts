import { createSlice } from "@reduxjs/toolkit";
import {dragStatuses} from '../constants/dragStatuses'
import { entities } from "../../components/constants/elementsSettings";

const initialState = {

    value: entities.Display.data

};

export const displaySlice = createSlice({
  name: "display",
  initialState,

  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },

  },
});
