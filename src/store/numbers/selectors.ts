import { dragStatuses } from "../constants/dragStatuses";
import type { RootState, AppDispatch } from '../index'

export const selectDisplayModule = (state: RootState) => state.numbers;
export const selectDisplayValue = (state: RootState) => selectDisplayModule(state).value;




