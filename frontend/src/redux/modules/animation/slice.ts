import { createSlice } from "@reduxjs/toolkit";
import { AnimationStateType } from "../../../../types/animation/animationStateType";
import { scriptGetAction, animationListGetAction } from "./thunk";

const initialState: AnimationStateType = {
  getAnimationList: { loading: false, data: null, error: null },
  getScript: { loading: false, data: null, error: null },
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
      });
  },
});

export default animationSlice.reducer;
