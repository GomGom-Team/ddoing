import { ReduxStateType } from "../reduxStateType";

export type AnimationStateType = {
  getAnimationList: ReduxStateType;
  getAnimation: ReduxStateType;
  getAnimationSearch: ReduxStateType;
  getAnimationStar: ReduxStateType;
  getAnimationDone: ReduxStateType;
  getScript: ReduxStateType;
  sendRecord: ReduxStateType;
  sendRecordResult: ReduxStateType;
};
