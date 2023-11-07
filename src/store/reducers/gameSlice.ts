import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {CreateGameData} from "../../api/GameApi.ts";
import GameController from "../../controllers/GameController.ts";

export type GameStatus = 'created' | 'in_process' | 'finished';
export interface GameState {
  isLoaded: boolean,
  title?: string,
  status?: GameStatus,
  playersCount?: number,
  moderator?: number,
  creationDate?: string,
  players?: any,
}

const initialState :GameState = {
  isLoaded: false,
};

export const createGame = createAsyncThunk(
  'game/create',
  async (data: CreateGameData) => {
    return await GameController.createGame(data);
  }
);


export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.isLoaded = true;
      state.title = action.payload.title;
      state.status = action.payload.status;
      state.playersCount = action.payload.playersCount;
      state.moderator = action.payload.moderator;
      state.creationDate = action.payload.creationDate;
      state.players = action.payload.players;
    },
  },
});

export const selectGameIsLoaded = (state: RootState) => state.game.isLoaded;
export const selectGame = (state: RootState) => state.game;

export const { setGame,  } = gameSlice.actions;
export default gameSlice.reducer;
