import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInitializer } from "../../util/https";

const axios = axiosInitializer();

export const getWordListAction:any = createAsyncThunk(
  "GET_WORD_LIST",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/drawing/words');
      console.log("요청 성공", data)
      return data;
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);