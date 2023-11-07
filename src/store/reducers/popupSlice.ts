import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface PopupState {
  isShown: boolean,
  data: {
    content?: JSX.Element,
    title?: JSX.Element,
  },
}

const initialState :PopupState = {
  isShown: false,
  data: {
    title: undefined,
    content: undefined
  },
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.isShown = true;
      state.data = {
        title: action.payload.title,
        content: action.payload.content,
      };
    },
    hidePopup: (state) => {
      state.isShown = false;
      state.data = {
        title: undefined,
        content: undefined,
      };
    },
  }
});

export const { showPopup, hidePopup } = popupSlice.actions;
export const selectPopupIsShown = (state: RootState) => state.popup.isShown;
export const selectPopupContent = (state: RootState) => state.popup.data;

export default popupSlice.reducer;
