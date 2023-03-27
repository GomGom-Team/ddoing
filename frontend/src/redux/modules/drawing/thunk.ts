import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInType } from "../../../../types/user/signinType";
import { axiosInitializer } from "../../util/https";

// 로그인
export const signinAction = createAsyncThunk(
  "SIGNIN",
  async (userData: SignInType, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .post("/api/auth/login", userData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }: any) => {
          setToken(data.token.accessToken);
        })
        .then(() => {
          dispatch(setUserWithTokenAction());
        });
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 로그인 정보 state에 저장
export const setUserWithTokenAction = createAsyncThunk(
  "GET_ME",
  async (token, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get("/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getToken(),
        },
      });
      return data;
    } catch (e) {
      // 토큰 refresh
      //   dispatch(refreshTokenAction());
      return rejectWithValue(e);
    }
  }
);

// 토큰 refresh
export const refreshTokenAction = createAsyncThunk(
  "REFRESH_TOKEN",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = { reqRefreshToken: getToken() };

      const axios = axiosInitializer();
      await axios
        .post("/api/auth/refresh", req)
        .then(({ data }) => {
          setToken(data.token.accessToken);
        })
        .then(() => {
          // user state에 저장
          dispatch(setUserWithTokenAction());
        });
    } catch (e) {
      // 로그아웃
      removeToken();
      return rejectWithValue(e);
    }
  }
);

// export default { signinAction, setUserWithTokenAction, refreshTokenAction };