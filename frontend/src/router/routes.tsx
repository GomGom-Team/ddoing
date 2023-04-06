import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import DrawingPage from "../pages/DrawingPage";
import LoginBox from "../components/user/LoginBox";
import RegisterBox from "../components/user/RegisterBox";
import MyPage from "../pages/MyPage";
import VideoListPage from "../pages/VideoListPage";
import VideoDetailPage from "../pages/VideoDetailPage";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
  },
  {
    path: "main",
    element: <MainPage />,
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
    path: "videolist",
    element: <VideoListPage />,
  },
  {
    path: "video/:id",
    element: <VideoDetailPage />,
  },
  {
    path: "landing",
    element: <LandingPage />,
  },
]);

export default router;
