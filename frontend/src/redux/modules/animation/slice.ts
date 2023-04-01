import { createSlice } from "@reduxjs/toolkit";
import { AnimationStateType } from "../../../../types/animation/animationStateType";
import {
  animationListGetAction,
  animationGetAction,
  animationSearchGetAction,
  animationStarGetAction,
  animationDoneGetAction,
  animationTop6GetAction,
  animationRemindGetAction,
  scriptGetAction,
  recordSendAction,
  recordResultSendAction,
} from "./thunk";

const initialState: AnimationStateType = {
  getAnimationList: { loading: false, data: null, error: null },
  getAnimation: { loading: false, data: null, error: null },
  getAnimationSearch: { loading: false, data: null, error: null },
  getAnimationStar: { loading: false, data: null, error: null },
  getAnimationDone: { loading: false, data: null, error: null },
  getAnimationTop6: { loading: false, data: null, error: null },
  getAnimationRemind: { loading: false, data: null, error: null },
  getScript: { loading: false, data: null, error: null },
  sendRecord: { loading: false, data: null, error: null },
  sendRecordResult: { loading: false, data: null, error: null },
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
      .addCase(animationGetAction.pending, (state) => {
        state.getAnimation.loading = true;
        state.getAnimation.data = null;
        state.getAnimation.error = null;
      })
      .addCase(animationGetAction.fulfilled, (state, { payload }) => {
        state.getAnimation.loading = false;
        state.getAnimation.data = payload;
        state.getAnimation.error = null;
      })
      .addCase(animationGetAction.rejected, (state, { payload }) => {
        state.getAnimation.loading = false;
        state.getAnimation.data = null;
        state.getAnimation.error = payload;
      })
      .addCase(animationSearchGetAction.pending, (state) => {
        state.getAnimationSearch.loading = true;
        state.getAnimationSearch.data = null;
        state.getAnimationSearch.error = null;
      })
      .addCase(animationSearchGetAction.fulfilled, (state, { payload }) => {
        state.getAnimationSearch.loading = false;
        state.getAnimationSearch.data = payload;
        state.getAnimationSearch.error = null;
      })
      .addCase(animationSearchGetAction.rejected, (state, { payload }) => {
        state.getAnimationSearch.loading = false;
        state.getAnimationSearch.data = null;
        state.getAnimationSearch.error = payload;
      })
      .addCase(animationStarGetAction.pending, (state) => {
        state.getAnimationStar.loading = true;
        state.getAnimationStar.data = null;
        state.getAnimationStar.error = null;
      })
      .addCase(animationStarGetAction.fulfilled, (state, { payload }) => {
        state.getAnimationStar.loading = false;
        state.getAnimationStar.data = payload;
        state.getAnimationStar.error = null;
      })
      .addCase(animationStarGetAction.rejected, (state, { payload }) => {
        state.getAnimationStar.loading = false;
        state.getAnimationStar.data = null;
        state.getAnimationStar.error = payload;
      })
      .addCase(animationDoneGetAction.pending, (state) => {
        state.getAnimationDone.loading = true;
        state.getAnimationDone.data = null;
        state.getAnimationDone.error = null;
      })
      .addCase(animationDoneGetAction.fulfilled, (state, { payload }) => {
        state.getAnimationDone.loading = false;
        state.getAnimationDone.data = payload;
        state.getAnimationDone.error = null;
      })
      .addCase(animationDoneGetAction.rejected, (state, { payload }) => {
        state.getAnimationDone.loading = false;
        state.getAnimationDone.data = null;
        state.getAnimationDone.error = payload;
      })
      .addCase(animationTop6GetAction.pending, (state) => {
        state.getAnimationTop6.loading = true;
        state.getAnimationTop6.data = null;
        state.getAnimationTop6.error = null;
      })
      .addCase(animationTop6GetAction.fulfilled, (state, { payload }) => {
        state.getAnimationTop6.loading = false;
        state.getAnimationTop6.data = payload;
        state.getAnimationTop6.error = null;
      })
      .addCase(animationTop6GetAction.rejected, (state, { payload }) => {
        state.getAnimationTop6.loading = false;
        state.getAnimationTop6.data = null;
        state.getAnimationTop6.error = payload;
      })
      .addCase(animationRemindGetAction.pending, (state) => {
        state.getAnimationRemind.loading = true;
        state.getAnimationRemind.data = null;
        state.getAnimationRemind.error = null;
      })
      .addCase(animationRemindGetAction.fulfilled, (state, { payload }) => {
        state.getAnimationRemind.loading = false;
        state.getAnimationRemind.data = payload;
        state.getAnimationRemind.error = null;
      })
      .addCase(animationRemindGetAction.rejected, (state, { payload }) => {
        state.getAnimationRemind.loading = false;
        state.getAnimationRemind.data = null;
        state.getAnimationRemind.error = payload;
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
      })
      .addCase(recordResultSendAction.pending, (state) => {
        state.sendRecordResult.loading = true;
        state.sendRecordResult.data = null;
        state.sendRecordResult.error = null;
      })
      .addCase(recordResultSendAction.fulfilled, (state, { payload }) => {
        state.sendRecordResult.loading = false;
        state.sendRecordResult.data = payload;
        state.sendRecordResult.error = null;
      })
      .addCase(recordResultSendAction.rejected, (state, { payload }) => {
        state.sendRecordResult.loading = false;
        state.sendRecordResult.data = null;
        state.sendRecordResult.error = payload;
      });
  },
});

export default animationSlice.reducer;
