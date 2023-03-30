import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";
import drawing from "./modules/drawing";
const store = configureStore({
  reducer: {
    user,
    drawing
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
