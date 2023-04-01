import { createAsyncThunk } from "@reduxjs/toolkit";
import { AnimationScoreType } from "../../../../types/animation/animationScoreType";
import { axiosInitializer } from "../../util/https";
import { setScore } from "./score";

const axios = axiosInitializer();

interface Ani {
  userId: string;
  animationId: number;
}

interface SearchAni {
  keyword: string;
  userId: string;
}

interface StarAni {
  userId: string;
  star: number;
}

interface DoneAni {
  userId: string;
  done: number;
}

// 영상 리스트 GET
export const animationListGetAction: any = createAsyncThunk(
  "GET_ANIMATION_LIST",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/animations/${userId}`);
      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 영상 GET
export const animationGetAction: any = createAsyncThunk(
  "GET_ANIMATION",
  async ({ userId, animationId }: Ani, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/animations/${animationId}/${userId}`
      );
      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 영상 검색 결과 GET
export const animationSearchGetAction: any = createAsyncThunk(
  "GET_ANIMATION_SEARCH",
  async ({ keyword, userId }: SearchAni, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/animations/search/${keyword}/${userId}`
      );
      if (data.length === 0) {
        return new Array();
      } else {
        return data;
      }
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 영상 별 필터링 결과 GET
export const animationStarGetAction: any = createAsyncThunk(
  "GET_ANIMATION_STAR",
  async ({ userId, star }: StarAni, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/animations/filter/star/${userId}/${star}`
      );
      if (data.length === 0) {
        return new Array();
      } else {
        return data;
      }
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 영상 수강여부 필터링 결과 GET
export const animationDoneGetAction: any = createAsyncThunk(
  "GET_ANIMATION_DONE",
  async ({ userId, done }: DoneAni, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/animations/filter/${userId}/${done}`
      );
      if (data.length === 0) {
        return new Array();
      } else {
        return data;
      }
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 영상 Top6 리스트 GET
export const animationTop6GetAction: any = createAsyncThunk(
  "GET_ANIMATION_TOP6",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/animations/top6/${userId}`);
      if (data.length === 0) {
        return new Array();
      } else {
        return data;
      }
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 스크립트 GET
export const scriptGetAction: any = createAsyncThunk(
  "GET_SCRIPT",
  async (animationId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/animations/script/${animationId}`);
      return data;
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 음성 녹음 데이터 POST
export const recordSendAction: any = createAsyncThunk(
  "SEND_RECORD",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .post("api/animations/evaluate", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }: any) => {
          setScore(data);
        });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 발음 평가 결과 POST
export const recordResultSendAction: any = createAsyncThunk(
  "SEND_RECORD_RESULT",
  async (scoreData: AnimationScoreType, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios.post("api/animations/score", scoreData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
