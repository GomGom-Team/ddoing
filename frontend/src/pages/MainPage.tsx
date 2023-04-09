import { useState, useEffect } from "react";
import tw, { css, styled } from "twin.macro";
import {
  HallofFame,
  Banner,
  PopularContents,
} from "../components/carousel/index";
import { Header } from "../components/common/index";
import axios from "axios";
import Loading from "../components/common/Loading";

interface DrawingListType {
  userId: string;
  drawingPath: string;
  percentage: number;
  word: string;
  mean: string;
  nickName: string;
}

interface TopVideoListType {
  id: number;
  title: string;
  runningTime: number;
  pathUrl: string;
  bestScore: number | null;
  roles: string[];
}

const MainPage = () => {
  const [bestDrawing, setBestDrawing] = useState<DrawingListType[] | null>(
    null
  );
  const [topVideoList, setTopVideoList] = useState<TopVideoListType[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const bestDrawingHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/drawing/gallery`)
      .then((res) => {
        // console.log(res.data);
        setBestDrawing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const topVideoListHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/top6`)
      .then((res) => {
        // console.log(res.data);
        setTopVideoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    api();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const api = async () => {
    bestDrawingHandler();
    topVideoListHandler();
  };

  // useEffect(() => {
  //   bestDrawingHandler();
  //   topVideoListHandler();
  // }, []);
  if (loading) return <Loading></Loading>;
  return (
    <AllWrapDiv>
      {/* Header */}
      <Header />
      <DummyDiv></DummyDiv>

      {/* Banner */}
      <Banner></Banner>
      {/* // Popular Contents */}
      <CarouselTitle1>✨ 인기 컨텐츠 ✨</CarouselTitle1>
      {topVideoList && <PopularContents topVideoList={topVideoList} />}

      {/* 명예의 전당 */}
      <CarouselTitle2>🎨 명예의 전당 🎨</CarouselTitle2>
      {bestDrawing && <HallofFame bestDrawing={bestDrawing} />}
      {/* <HallofFame></HallofFame> */}

      {/* Footer  */}
      {/* <Footer /> */}
      <DummyDiv></DummyDiv>
      <DummyDiv></DummyDiv>
    </AllWrapDiv>
  );
};

// style
const DummyDiv = styled.div(tw`h-20 w-full`);

const CarouselTitle1 = styled.div(
  tw`flex items-center justify-center text-5xl`,
  css`
    font-family: "PyeongChangPeace-Bold";
    padding-top: 3.5vw;
    padding-bottom: 2.5vw;
  `
);
const CarouselTitle2 = styled.div(
  tw`flex items-center justify-center text-5xl py-16`,
  css`
    font-family: "PyeongChangPeace-Bold";
  `
);

const AllWrapDiv = styled.div`
  width: 100%;
`;

export default MainPage;
