import { createSlice } from "@reduxjs/toolkit";
import { dragStatuses } from "../constants/dragStatuses";
import { modes } from "../../components/constants/calcModes";

interface IinitialState {
  mode: string;
  inCanvas: any;
  activeEl: null | string;
  height: number;
  Operationsvalue: string;
  Numbersvalue: string;
  dbClickPosition: number[];
}

const initialState: IinitialState = {
  mode: modes.constructor,
  inCanvas: [],
  activeEl: null,
  height: 0,
  Operationsvalue: "",
  Numbersvalue: "",
  dbClickPosition: [],
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,

  reducers: {
    updateMode: (state, action) => {
      state.mode = action.payload;
    },
    updateHight: (state, action) => {
      console.log("height", action.payload);
      state.height -= action.payload;
    },
    addToCanvas: (state, action) => {
      if (action.payload) {
        let inCanvas = [...state.inCanvas];

        if (action.payload.id === "Display") {
          inCanvas.unshift(action.payload.id);
        } else {
          inCanvas.push(action.payload.id);
        }
        state.inCanvas = [...inCanvas];
        state.height += action.payload.ElHeight;
      }
    },
    removeFromCanvas: (state, action) => {
      if (action.payload) {
        state.inCanvas = state.inCanvas.filter(
          (item: string) => item !== action.payload
        );
      }
    },
    changeActiveElement: (state, action) => {
      state.activeEl = action.payload;
    },

    updateOperations: (state, action) => {
      state.Operationsvalue = action.payload;
    },

    updateNumbers: (state, action) => {
      console.log(state.Numbersvalue);
      state.Numbersvalue += action.payload;
      console.log(state.Numbersvalue);
    },

    dbClickPosition: (state, action) => {
      state.dbClickPosition = [action.payload.pageX, action.payload.pageY];
    },
  },
});
