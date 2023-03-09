import { dragStatuses } from "../constants/dragStatuses";
import type { RootState, AppDispatch } from '../index'

export const selectDisplayModule = (state: RootState) => state.numbers;
export const selectDisplayValue = (state: RootState) => selectDisplayModule(state).value;
export const selectDisplayStatus = (state: RootState) => selectDisplayModule(state).status;
export const selectDisplayIsInDragginProgress = (state: RootState) => selectDisplayModule(state).status === dragStatuses.inProgress;
export const selectDisplayIsTaken = (state: RootState) => selectDisplayModule(state).status === dragStatuses.taken;
export const selectDisplayIsDropped = (state: RootState) => selectDisplayModule(state).status === dragStatuses.dropped;
