import { createSlice } from "@reduxjs/toolkit";
import { dragStatuses } from "../constants/dragStatuses";
import { modes } from "../../components/constants/calcModes";

interface IinitialState {
  mode: string;
  inCanvas: any;
  activeEl: null | string;
  height: number;
  Operationsvalue: string | null;
  Numbersvalue: string;
  prevNumbersvalue: string;
  Resultvalue: any;
  needToCount: any[];
  dbClickPosition: number[];
}

const initialState: IinitialState = {
  mode: modes.constructor,
  inCanvas: [],
  activeEl: null,
  height: 0,
  Operationsvalue: null,
  Numbersvalue: "",
  prevNumbersvalue: "",
  Resultvalue: 0,
  needToCount: [],
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
      if (state.prevNumbersvalue === state.Numbersvalue) {
        if (action.payload) state.Operationsvalue = action.payload;
        return;
      }

      if (state.Operationsvalue) {
        state.needToCount.push(state.Operationsvalue);
        if (action.payload) state.Operationsvalue = action.payload;
        state.needToCount.push(state.Numbersvalue);
      }

      if (!state.Operationsvalue) {
        state.prevNumbersvalue = state.Numbersvalue;
        state.needToCount.push(state.prevNumbersvalue);
        if (action.payload) state.Operationsvalue = action.payload;
      }

      state.prevNumbersvalue = state.Numbersvalue;
    },

    updateNumbers: (state, action) => {
      if (state.prevNumbersvalue === state.Numbersvalue) {
        if (action.payload) state.Numbersvalue = action.payload;
      } else {
        if (action.payload) state.Numbersvalue += action.payload;
      }
    },

    updateResult: (state, action) => {
      state.needToCount.push(state.Operationsvalue);
      state.needToCount.push(state.Numbersvalue);

      let result = 0,
        num1 = 0;

      let math_symb: string | null = null;
      state.needToCount.forEach((item, i) => {
        if (i === 0) {
          num1 = parseFloat(item.replace(",", "."));
        }

        if (i !== 0 && i % 2 === 1) {
          math_symb = item;
        }
        if (i !== 0 && i % 2 === 0) {
          let num2 = parseFloat(item.replace(",", "."));
          if (math_symb === null) return;
          console.log(math_symb, "math_symb");
          switch (math_symb) {
            case "+":
              result = Number(num1) + Number(num2);
              break;
            case "-":
              result = Number(num1) - Number(num2);
              break;
            case "/":
              result = Number(num1) / Number(num2);
              break;
            case "X":
              result = Number(num1) * Number(num2);
              break;
            default:
              break;
          }

          state.Resultvalue = isFinite(result)
            ? result.toString().replace(".", ",")
            : "Не определено";

          math_symb = null;
        }
      });
    },

    dbClickPosition: (state, action) => {
      state.dbClickPosition = [action.payload.pageX, action.payload.pageY];
    },
  },
});
