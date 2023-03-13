import { dragStatuses } from "../constants/dragStatuses";
import type { RootState, AppDispatch } from '../index'

export const selectCalculatorModule = (state: RootState) => state.calculator;

export const selectCalculatorMode = (state: RootState) => selectCalculatorModule(state).mode;
export const selectCalculatorActiveEl = (state: RootState) => selectCalculatorModule(state).activeEl;

export const selectCalculatorInCanvas = (state: RootState) => selectCalculatorModule(state).inCanvas;