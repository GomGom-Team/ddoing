import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInitializer }from '../../util/https';


const axios = axiosInitializer()

export const checkDupEmailAction = createAsyncThunk(
  "CHECK_DUP_EMAIL",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/email/${email}`);

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);