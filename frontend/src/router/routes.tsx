import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import DrawingPage from "../pages/DrawingPage";
import LoginBox from "../components/user/LoginBox";
import RegisterBox from "../components/user/RegisterBox";
import MyPage from "../pages/MyPage";
import Soundtest from "../pages/soundtest";
import VideoList from "../pages/videolist";
import VideoTest from "../pages/videotest";

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
    path: "animation",
    element: <div>빈페이지 입니다.</div>,
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
    element: <VideoList />,
  },
  {
    path: "video/:id",
    element: <VideoTest />,
  },
]);

export default router;
