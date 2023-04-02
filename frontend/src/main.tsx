import React from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles/GlobalStyles";
import App from "./App";
import "./fonts/font.css";
import store from "./redux/configStore";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {/* <React.StrictMode> */}
      <GlobalStyles />
      <App />
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);
