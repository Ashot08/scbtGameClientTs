import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface QuizState {
  isActive: boolean,
  timerOn: boolean,
}

const initialState :QuizState = {
  isActive: false,
  timerOn: false,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    show: (state) => {
      state.isActive = true;
    },
    hide: (state) => {
      state.isActive = false;
    },
    offTimer: (state) => {
      state.timerOn = false;
    },
    onTimer: (state) => {
      state.timerOn = true;
    },
  }
});

export const { show, hide, offTimer, onTimer} = quizSlice.actions;
export const selectIsActive = (state: RootState) => state.quiz.isActive;
export const selectTimerOn = (state: RootState) => state.quiz.timerOn;

export default quizSlice.reducer;
