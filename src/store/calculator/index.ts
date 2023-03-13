import { createSlice } from "@reduxjs/toolkit";
import {dragStatuses} from '../constants/dragStatuses';
import {modes} from '../../components/constants/calcModes';
interface IinitialState {
  mode: string,
    inCanvas: any,
    activeEl: null | string,
    height: number
}

const initialState:IinitialState = {
    mode: modes.constructor,
    inCanvas:[],
    activeEl: null,
    height: 0
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
        state.inCanvas.push(action.payload.id);
        state.height += action.payload.ElHeight
      }
      
    }, 
    removeFromCanvas: (state, action) => {
      if (action.payload) {
        state.inCanvas = state.inCanvas.filter((item:string)=> item !== action.payload);
      }
      
    }, 
    changeActiveElement: (state, action) => {
        state.activeEl = action.payload;
      },  
    },
});
