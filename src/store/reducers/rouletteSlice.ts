import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface RouletteState {
  isRoll: boolean,
  prizeNumber?: number,
  result?: string,
  playerName?: string,
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
    setMeta: (state, action) => {
      state.result = action.payload.result;
      state.playerName = action.payload.playerName;
    },
  }
});

export const { roll, stopRoll, setMeta } = rouletteSlice.actions;
export const selectIsRoll = (state: RootState) => state.roulette.isRoll;
export const selectPrizeNumber = (state: RootState) => state.roulette.prizeNumber;
export const selectResult = (state: RootState) => state.roulette.result;
export const selectPlayerName = (state: RootState) => state.roulette.playerName;

export default rouletteSlice.reducer;
