import { Fragment } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import DrawingPage from "../pages/DrawingPage";
import LoginBox from "../components/user/LoginBox";
import RegisterBox from "../components/user/RegisterBox";
import MyPage from "../pages/MyPage";
import Soundtest from "../pages/soundtest";
import VideoListPage from "../pages/VideoListPage";
import VideoTest from "../pages/videotest";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainPage />,
    // children: [
    //   {
    //     path: "dashboard",
    //     element: <Dashboard />,
    //   },
    //   {
    //     path: "about",
    //     element: <About />,
    //   },
    // ],
  },
  {
    path: "login",
    element: <LoginBox />,
  },
  {
    path: "register",
    element: <RegisterBox />,
  },
  {
    path: "drawing",
    element: <DrawingPage />,
  },
  {
    path: "ranking",
    element: <div>빈페이지 입니다.</div>,
  },
  {
    path: "mypage",
    element: <MyPage />,
  },
  {
    path: "sound",
    element: <Soundtest />,
  },
  {
    path: "videolist",
    element: <VideoListPage />,
  },
  {
    path: "video/:id",
    element: <VideoTest />,
  },
  {
    path: "landing",
    element: <LandingPage />,
  },
]);

export default router;
