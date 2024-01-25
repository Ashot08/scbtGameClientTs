import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import userReducer from "./reducers/userSlice.ts";
import gameReducer from "./reducers/gameSlice.ts";
import popupReducer from "./reducers/popupSlice.ts";
import notificationReducer from "./reducers/notificationSlice.ts";
import rouletteReducer from "./reducers/rouletteSlice.ts";
import quizReducer from "./reducers/quizSlice.ts";
import gameInfoReducer from "./reducers/gameInfoSlice.ts";
import buyWindowReducer from "./reducers/buyWindowSlice.ts";
import buyResourcesWindowReducer from "./reducers/buyResourcesWindowSlice.ts";


export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    game: gameReducer,
    popup: popupReducer,
    roulette: rouletteReducer,
    quiz: quizReducer,
    gameInfo: gameInfoReducer,
    buyWindow: buyWindowReducer,
    buyResourcesWindow: buyResourcesWindowReducer,
  },
  devTools: false,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
