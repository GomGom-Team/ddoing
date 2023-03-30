import { createSlice } from "@reduxjs/toolkit";
import { DrawingStateType } from "../../../../types/drawing/drawingStateType"
import {
  getWordListAction
} from "./thunk";

const initialState: DrawingStateType = {
  getWordList: {loading: false, data: null, error: null}
}

const drawingSlice = createSlice({
  name: "drawing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // WordList 'Get'
    .addCase(getWordListAction.pending, (state) => {
      state.getWordList.loading = true;
      state.getWordList.data = null;
      state.getWordList.error = null;
    })
    .addCase(getWordListAction.fulfilled, (state, { payload }) => {
      state.getWordList.loading = false;
      state.getWordList.data = payload;
      state.getWordList.error = null;
    })
    .addCase(getWordListAction.rejected, (state, { payload }) => {
      state.getWordList.loading = false;
      state.getWordList.data = null;
      state.getWordList.error = payload;
    })
  }

})


export default drawingSlice.reducer;
