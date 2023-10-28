import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {AlertColor} from "@mui/material";

export interface NotificationState {
  isShown: boolean,
  text: string,
  status:  AlertColor | undefined,
}

const initialState :NotificationState = {
  isShown: false,
  status: undefined,
  text: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    show: (state, action) => {
      state.isShown = true;
      state.text = action.payload.text;
      state.status = action.payload.status;
    },
    hide: (state) => {
      state.isShown = false;
      state.text = '';
      state.status = undefined;
    },
  }
});

export const { show, hide } = notificationSlice.actions;
export const selectNotificationIsShown = (state: RootState) => state.notification.isShown;
export const selectNotificationText = (state: RootState) => state.notification.text;
export const selectNotificationStatus = (state: RootState) => state.notification.status;

export default notificationSlice.reducer;
