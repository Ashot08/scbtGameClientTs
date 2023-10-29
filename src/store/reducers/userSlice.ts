import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import AuthController from "../../controllers/AuthController.ts";
import {SignInData, SignUpData} from "../../api/AuthApi.ts";
import Token from "../../utils/Token.ts";

export interface UserState {
  isLogin: boolean,
  username: string,
  name?: string,
  email?: string,
}

const initialState :UserState = {
  isLogin: false,
  username: '',
  name: '',
  email: '',
};

export const login = createAsyncThunk(
  'user/login',
  async (data: SignInData) => {
    const result = await AuthController.login(data);

    if(result.token) {
      Token.setToken(result.token, result.id);
    }

    return result;
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (data: SignUpData) => {
    const result = await AuthController.signup(data);

    if(result.token) {
      Token.setToken(result.token, result.id);
    }

    return result;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    Token.removeToken();
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLogin = true;
      state.username = action.payload.username;
      state.name = action.payload.name || '';
      state.email = action.payload.email || '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLogin = !!action.payload.username;
        state.username = action.payload.username;
        state.name = action.payload.name || '';
        state.email = action.payload.email || '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLogin = false;
        state.username = '';
        state.name = '';
        state.email = '';
      })
  },
});

export const selectUserLogin = (state: RootState) => state.user.username;
export const selectUserName = (state: RootState) => state.user.name;
export const selectUserIsLogin = (state: RootState) => state.user.isLogin;

export const { setUser,  } = userSlice.actions;
export default userSlice.reducer;
