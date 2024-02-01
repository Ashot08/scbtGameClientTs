import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface BuyWindowState {
  isShown: boolean,
  index: number,
}

const initialState :BuyWindowState = {
  isShown: false,
  index: 0,
};

export const buyWindowSlice = createSlice({
  name: 'buyWindow',
  initialState,
  reducers: {
    showBuyWindow: (state, action) => {
      state.isShown = true;
      state.index = action.payload.index;
    },
    hideBuyWindow: (state) => {
      state.isShown = false;
      state.index = 0;
    },

  }
});

export const { showBuyWindow, hideBuyWindow } = buyWindowSlice.actions;
export const selectBuyWindowIsShown = (state: RootState) => state.buyWindow.isShown;
export const selectBuyWindowIndex = (state: RootState) => state.buyWindow.index;

export default buyWindowSlice.reducer;
