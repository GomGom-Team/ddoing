import React from "react";
import tw from "twin.macro";
import { Container, Header, Footer } from "./components/common";
import { RouterProvider, Routes } from "react-router-dom";
import router from "./router/routes";
import MainPage from "./pages/MainPage";

const App = () => (
  // <Container isOverflowed>
  <RouterProvider router={router} />
  // </Container>
);

export default App;
