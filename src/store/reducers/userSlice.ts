import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface UserState {
  isLogin: boolean,
  username: string,
  name: string,
  email: string,
  password: string,
}

const initialState :UserState = {
  isLogin: false,
  username: '',
  name: '',
  email: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  }
});

export const selectUserLogin = (state: RootState) => state.user.username;
export const selectUserName = (state: RootState) => state.user.name;
export const selectUserIsLogin = (state: RootState) => state.user.isLogin;

export default userSlice.reducer;
