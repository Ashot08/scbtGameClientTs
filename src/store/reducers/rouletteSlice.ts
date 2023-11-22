import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface RouletteState {
  isRoll: boolean,
  prizeNumber?: number,
}

const initialState :RouletteState = {
  isRoll: false,
};

export const rouletteSlice = createSlice({
  name: 'roulette',
  initialState,
  reducers: {
    roll: (state, action) => {
      state.isRoll = true;
      state.prizeNumber = action.payload.prizeNumber;
    },
    stopRoll: (state) => {
      state.isRoll = false;
    },
  }
});

export const { roll, stopRoll } = rouletteSlice.actions;
export const selectIsRoll = (state: RootState) => state.roulette.isRoll;
export const selectPrizeNumber = (state: RootState) => state.roulette.prizeNumber;

export default rouletteSlice.reducer;
