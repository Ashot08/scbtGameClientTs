import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface BuyResourcesWindowState {
  isShown: boolean,
}

const initialState :BuyResourcesWindowState = {
  isShown: false,
};

export const buyResourcesWindowSlice = createSlice({
  name: 'buyResourcesWindow',
  initialState,
  reducers: {
    showBuyResourcesWindow: (state) => {
      state.isShown = true;
    },
    hideBuyResourcesWindow: (state) => {
      state.isShown = false;
    },
  }
});

export const { showBuyResourcesWindow, hideBuyResourcesWindow } = buyResourcesWindowSlice.actions;
export const selectBuyResourcesWindowIsShown = (state: RootState) => state.buyResourcesWindow.isShown;

export default buyResourcesWindowSlice.reducer;
