import { ReduxStateType } from "../reduxStateType";
import { UserType } from "./userType";

export type UserStateType = {
  userData: UserType;
  signup: ReduxStateType;
  checkDupId: ReduxStateType;
  checkDupNickName: ReduxStateType;
  checkDupEmail: ReduxStateType;
  signin: ReduxStateType;
  getMe: ReduxStateType;
  updateUser: ReduxStateType;
  deleteUser: ReduxStateType;
  refreshToken: ReduxStateType;
};
