import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import userReducer from "./reducers/userSlice.ts";
import gameReducer from "./reducers/gameSlice.ts";
import popupReducer from "./reducers/popupSlice.ts";
import notificationReducer from "./reducers/notificationSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    game: gameReducer,
    popup: popupReducer,
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
