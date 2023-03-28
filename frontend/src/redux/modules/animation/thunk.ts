import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInitializer } from "../../util/https";
import { setScore } from "./score";

const axios = axiosInitializer();

// 영상 리스트 GET
export const animationListGetAction = createAsyncThunk(
  "GET_ANIMATION_LIST",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/animations/${userId}`);
      return data;
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 스크립트 GET
export const scriptGetAction = createAsyncThunk(
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
export const recordSendAction = createAsyncThunk(
  "RECORD_SEND",
  async (formData: FormData, { rejectWithValue }) => {
    try {
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
