import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface GameInfoState {
  isShown: boolean,
  data: {
    status?: 'success' | 'disaster' | 'info',
    needBonusesCount ?: number,
    title ?: string,
    content ?: JSX.Element,
    disasterType ?: string,
  },
}

const initialState :GameInfoState = {
  isShown: false,
  data: {
    status: undefined,
    needBonusesCount: undefined,
    title: undefined,
    content: undefined,
    disasterType: '',
  },
};

export const gameInfoSlice = createSlice({
  name: 'gameInfo',
  initialState,
  reducers: {
    showGameInfo: (state, action) => {
      state.isShown = true;
      state.data = {
        status: action.payload.status,
        needBonusesCount: action.payload.needBonusesCount,
        disasterType: action.payload.disasterType,
        title: action.payload.title,
        content: action.payload.content,
      };
    },
    hideGameInfo: (state) => {
      state.isShown = false;
      state.data = {
        status: undefined,
        needBonusesCount: undefined,
        title: undefined,
        content: undefined,
        disasterType: '',
      };
    },
  }
});

export const { showGameInfo, hideGameInfo } = gameInfoSlice.actions;
export const selectGameInfoIsShown = (state: RootState) => state.gameInfo.isShown;
export const selectGameInfoContent = (state: RootState) => state.gameInfo.data;

export default gameInfoSlice.reducer;
