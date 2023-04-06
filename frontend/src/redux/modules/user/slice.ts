import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../../../types/user/userStateType";
import {
  signupAction,
  checkIdAction,
  checkNickNameAction,
  checkEmailAction,
  signinAction,
  setUserWithTokenAction,
  refreshTokenAction,
  logoutAction,
} from "./thunk";

const initialState: UserStateType = {
  userData: {
    id: "",
    name: "",
    nickName: "",
    email: "",
    level: 1,
    exp: 0,
    profile: "",
    isLoggedIn: false,
  },
  signin: { loading: false, data: null, error: null },
  signup: { loading: false, data: null, error: null },
  checkId: { loading: false, data: null, error: null },
  checkNickName: { loading: false, data: null, error: null },
  checkEmail: { loading: false, data: null, error: null },
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
      .addCase(checkIdAction.pending, (state) => {
        state.checkId.loading = true;
        state.checkId.data = null;
        state.checkId.error = null;
      })
      .addCase(checkIdAction.fulfilled, (state, { payload }) => {
        state.checkId.loading = false;
        state.checkId.data = payload;
        state.checkId.error = null;
      })
      .addCase(checkIdAction.rejected, (state, { payload }) => {
        state.checkId.loading = false;
        state.checkId.data = null;
        state.checkId.error = payload;
      })
      .addCase(checkNickNameAction.pending, (state) => {
        state.checkNickName.loading = true;
        state.checkNickName.data = null;
        state.checkNickName.error = null;
      })
      .addCase(checkNickNameAction.fulfilled, (state, { payload }) => {
        state.checkNickName.loading = false;
        state.checkNickName.data = payload;
        state.checkNickName.error = null;
      })
      .addCase(checkNickNameAction.rejected, (state, { payload }) => {
        state.checkNickName.loading = false;
        state.checkNickName.data = null;
        state.checkNickName.error = payload;
      })
      .addCase(checkEmailAction.pending, (state) => {
        state.checkEmail.loading = true;
        state.checkEmail.data = null;
        state.checkEmail.error = null;
      })
      .addCase(checkEmailAction.fulfilled, (state, { payload }) => {
        state.checkEmail.loading = false;
        state.checkEmail.data = payload;
        state.checkEmail.error = null;
      })
      .addCase(checkEmailAction.rejected, (state, { payload }) => {
        state.checkEmail.loading = false;
        state.checkEmail.data = null;
        state.checkEmail.error = payload;
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
        state.userData.id = payload.id;
        state.userData.email = payload.email;
        state.userData.name = payload.name;
        state.userData.nickName = payload.nickName;
        state.userData.level = payload.level;
        state.userData.exp = payload.exp;
        state.userData.profile = payload.profile;
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
      })
      .addCase(logoutAction.fulfilled, (state, { payload }) => {
        state.userData.id = "";
        state.userData.nickName = "";
        state.userData.email = "";
        state.userData.name = "";
        state.userData.level = 0;
        state.userData.exp = 0;
        state.userData.isLoggedIn = false;
      });
  },
});

export default userSlice.reducer;
