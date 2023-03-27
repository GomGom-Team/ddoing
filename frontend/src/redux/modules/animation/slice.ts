import { createSlice } from "@reduxjs/toolkit";
import { AnimationStateType } from "../../../../types/animation/animationStateType";
import {
  scriptGetAction,
  animationListGetAction,
  recordSendAction,
} from "./thunk";

const initialState: AnimationStateType = {
  getAnimationList: { loading: false, data: null, error: null },
  getScript: { loading: false, data: null, error: null },
  sendRecord: { loading: false, data: null, error: null },
};

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(animationListGetAction.pending, (state) => {
        state.getAnimationList.loading = true;
        state.getAnimationList.data = null;
        state.getAnimationList.error = null;
      })
      .addCase(animationListGetAction.fulfilled, (state, { payload }) => {
        state.getAnimationList.loading = false;
        state.getAnimationList.data = payload;
        state.getAnimationList.error = null;
      })
      .addCase(animationListGetAction.rejected, (state, { payload }) => {
        state.getAnimationList.loading = false;
        state.getAnimationList.data = null;
        state.getAnimationList.error = payload;
      })
      .addCase(scriptGetAction.pending, (state) => {
        state.getScript.loading = true;
        state.getScript.data = null;
        state.getScript.error = null;
      })
      .addCase(scriptGetAction.fulfilled, (state, { payload }) => {
        state.getScript.loading = false;
        state.getScript.data = payload;
        state.getScript.error = null;
      })
      .addCase(scriptGetAction.rejected, (state, { payload }) => {
        state.getScript.loading = false;
        state.getScript.data = null;
        state.getScript.error = payload;
      })
      .addCase(recordSendAction.pending, (state) => {
        state.sendRecord.loading = true;
        state.sendRecord.data = null;
        state.sendRecord.error = null;
      })
      .addCase(recordSendAction.fulfilled, (state, { payload }) => {
        state.sendRecord.loading = false;
        state.sendRecord.data = payload;
        state.sendRecord.error = null;
      })
      .addCase(recordSendAction.rejected, (state, { payload }) => {
        state.sendRecord.loading = false;
        state.sendRecord.data = null;
        state.sendRecord.error = payload;
      });
  },
});

export default animationSlice.reducer;
