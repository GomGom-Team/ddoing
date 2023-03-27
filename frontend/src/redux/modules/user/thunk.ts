import { createAsyncThunk } from "@reduxjs/toolkit";
import { SigninType } from "../../../../types/user/signinType";
import { SignupType } from "../../../../types/user/signupType";
import { UserType } from "../../../../types/user/userType";
import { getToken, setToken, removeToken } from "./token";
import { UpdateUserType } from "../../../../types/user/updateUserType";
import { axiosInitializer } from "../../util/https";

// 회원가입
export const signupAction = createAsyncThunk(
  "SIGNUP",
  async (userData: SignupType, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios.post("/api/users", userData);
      alert("회원가입 완료");
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 아이디 중복 체크
export const checkIdAction = createAsyncThunk(
  "CHECK_ID",
  async (id: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/users/id/${id}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 닉네임 중복 체크
export const checkNickNameAction = createAsyncThunk(
  "CHECK_NICKNAME",
  async (nickName: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/users/nickName/${nickName}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 이메일 중복 체크
export const checkEmailAction = createAsyncThunk(
  "CHECK_EMAIL",
  async (email: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/users/email/${email}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 로그인
export const signinAction = createAsyncThunk(
  "SIGNIN",
  async (userData: SigninType, { dispatch, rejectWithValue }) => {
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
      console.log(getToken());
      return data;
    } catch (e) {
      // 토큰 refresh
      dispatch(refreshTokenAction());
      return rejectWithValue(e);
    }
  }
);

// 토큰 refresh
export const refreshTokenAction = createAsyncThunk(
  "REFRESH_TOKEN",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = { accessToken: getToken() };

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
      alert("세션이 만료되어 로그아웃 되었습니다.");
      return rejectWithValue(e);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "LOGOUT",
  async (_, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .delete("api/auth/logout", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getToken(),
          },
        })
        .then(() => {
          removeToken();
          alert("로그아웃 되었습니다.");
        });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// export default { signinAction, setUserWithTokenAction, refreshTokenAction };
