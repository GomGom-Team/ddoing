import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../../../types/user/userStateType";
import {
  signupAction,
  signinAction,
  setUserWithTokenAction,
  refreshTokenAction,
} from "./thunk";

const initialState: UserStateType = {
  userData: {
    id: "",
    name: "",
    nickName: "",
    email: "",
    level: 0,
    exp: 0,
    isLoggedIn: false,
  },
  signin: { loading: false, data: null, error: null },
  signup: { loading: false, data: null, error: null },
  checkDupEmail: { loading: false, data: null, error: null },
  checkDupId: { loading: false, data: null, error: null },
  checkDupNickName: { loading: false, data: null, error: null },
  getMe: { loading: false, data: null, error: null },
  updateUser: { loading: false, data: null, error: null },
  deleteUser: { loading: false, data: null, error: null },
  refreshToken: { loading: false, data: null, error: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAction.pending, (state) => {
        state.signup.loading = true;
        state.signup.data = null;
        state.signup.error = null;
      })
      .addCase(signupAction.fulfilled, (state, { payload }) => {
        state.signup.loading = false;
        state.signup.data = payload;
        state.signup.error = null;
      })
      .addCase(signupAction.rejected, (state, { payload }) => {
        state.signup.loading = false;
        state.signup.data = null;
        state.signup.error = payload;
      })
      .addCase(signinAction.pending, (state) => {
        state.signin.loading = true;
        state.signin.data = null;
        state.signin.error = null;
      })
      .addCase(signinAction.fulfilled, (state, { payload }) => {
        state.signin.loading = false;
        state.signin.data = payload;
        state.signin.error = null;
      })
      .addCase(signinAction.rejected, (state, { payload }) => {
        state.signin.loading = false;
        state.signin.data = null;
        state.signin.error = payload;
      })
      .addCase(setUserWithTokenAction.pending, (state) => {
        state.getMe.loading = true;
        state.getMe.data = null;
        state.getMe.error = null;
      })
      .addCase(setUserWithTokenAction.fulfilled, (state, { payload }) => {
        state.getMe.loading = false;
        state.getMe.data = payload;
        state.getMe.error = null;

        state.userData.id = payload.userId;
        state.userData.email = payload.email;
        state.userData.name = payload.name;
        state.userData.nickName = payload.nickName;
        state.userData.level = payload.level;
        state.userData.exp = payload.exp;
        state.userData.isLoggedIn = true;
      })
      .addCase(setUserWithTokenAction.rejected, (state, { payload }) => {
        state.getMe.loading = false;
        state.getMe.data = null;
        state.getMe.error = payload;
      })
      .addCase(refreshTokenAction.pending, (state) => {
        state.refreshToken.loading = true;
        state.refreshToken.data = null;
        state.refreshToken.error = null;
      })
      .addCase(refreshTokenAction.fulfilled, (state, { payload }) => {
        state.refreshToken.loading = false;
        state.refreshToken.data = payload;
        state.refreshToken.error = null;
      })
      .addCase(refreshTokenAction.rejected, (state, { payload }) => {
        state.refreshToken.loading = false;
        state.refreshToken.data = null;
        state.refreshToken.error = payload;
      });
  },
});

export default userSlice.reducer;
