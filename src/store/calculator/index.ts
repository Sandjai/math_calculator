import { createSlice } from "@reduxjs/toolkit";
import {dragStatuses} from '../constants/dragStatuses';
import {modes} from '../../components/constants/calcModes';
interface IinitialState {
  mode: string,
    inCanvas: string[],
    activeEl: null | string,
}

const initialState:IinitialState = {
    mode: modes.constructor,
    inCanvas:[],
    activeEl: null,
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,

  reducers: {
    updateMode: (state, action) => {
      state.mode = action.payload;
    },
    addToCanvas: (state, action) => {
      if (action.payload) {
        state.inCanvas.push(action.payload);
      }
      
    }, 
    removeFromCanvas: (state, action) => {
      if (action.payload) {
        state.inCanvas = state.inCanvas.filter((item)=> item !== action.payload);
      }
      
    }, 
    changeActiveElement: (state, action) => {
        state.activeEl = action.payload;
      },  
    },
});
