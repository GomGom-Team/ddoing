import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import user from "./modules/user";
import animation from "./modules/animation";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import { composeWithDevTools } from "redux-devtools-extension";
// import persistReducer from "redux-persist/es/persistReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const persistConfig = {
  key: "user",
  storage,
  blacklist: ["auth"],
};

const rootReducer = combineReducers({
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
