import { createSlice } from "@reduxjs/toolkit";
import { DrawingStateType } from "../../../../types/drawing/drawingStateType"
import {
  getWordListAction,
  getRecentDrawingAction
} from "./thunk";

const initialState: DrawingStateType = {
  getWordList: {loading: false, data: null, error: null},
  getRecentDrawing: {loading: false, data: null, error: null},

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
    
    // Recent Drawing 'Get'
    .addCase(getRecentDrawingAction.pending, (state) => {
      state.getRecentDrawing.loading = true;
      state.getRecentDrawing.data = null;
      state.getRecentDrawing.error = null;
    })
    .addCase(getRecentDrawingAction.fulfilled, (state, { payload }) => {
      state.getRecentDrawing.loading = false;
      state.getRecentDrawing.data = payload;
      state.getRecentDrawing.error = null;
    })
    .addCase(getRecentDrawingAction.rejected, (state, { payload }) => {
      state.getRecentDrawing.loading = false;
      state.getRecentDrawing.data = null;
      state.getRecentDrawing.error = payload;
    })
  }

})


export default drawingSlice.reducer;
