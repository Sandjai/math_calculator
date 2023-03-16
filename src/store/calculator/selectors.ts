import { dragStatuses } from "../constants/dragStatuses";
import type { RootState, AppDispatch } from "../index";

export const selectCalculatorModule = (state: RootState) => state.calculator;

export const selectCalculatorMode = (state: RootState) =>
  selectCalculatorModule(state).mode;
export const selectCalculatorActiveEl = (state: RootState) =>
  selectCalculatorModule(state).activeEl;

export const selectCalculatorInCanvas = (state: RootState) =>
  selectCalculatorModule(state).inCanvas;
export const selectCanvasHeight = (state: RootState) =>
  selectCalculatorModule(state).height;

export const selectNumbersvalue = (state: RootState) =>
  selectCalculatorModule(state).Numbersvalue;

export const selectindexOfNumbers = (state: RootState) =>
  selectCalculatorInCanvas(state).indexOf("Numbers");

export const selectdbClickPosition = (state: RootState) =>
  selectCalculatorModule(state).dbClickPosition;

export const selectCalculatorResults = (state: RootState) =>
  selectCalculatorModule(state).Resultvalue;
