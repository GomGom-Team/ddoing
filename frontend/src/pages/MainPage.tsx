import React, { useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import {
  HallofFame,
  Banner,
  PopularContents,
} from "../components/carousel/index";
import { Container, Header, Footer } from "../components/common/index";
import { animationTop6GetAction } from "../redux/modules/animation";
import axios from "axios";
import Loading from "../components/common/Loading";

interface DrawingListType {
  userId: string;
  drawingPath: string;
  percentage: number;
  word: string;
  mean: string;
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
        console.log(res.data);
        setBestDrawing(res.data);
      })
      .catch((err) => {
        console.log("제에에에에에발", err);
      });
  };

  const topVideoListHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/top6`)
      .then((res) => {
        console.log(res.data);
        setTopVideoList(res.data);
      })
      .catch((err) => {
        console.log("제에에에에에발", err);
      });
  };

  useEffect(() => {
    setLoading(true);
    api();
    setTimeout(() => {
      setLoading(false);
    }, 2700);
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
    <Container isOverflowed>
      {/* Header */}
      <Header />
      <DummyDiv></DummyDiv>

      {/* Banner */}
      <Banner></Banner>
      {/* // Popular Contents */}
      <CarouselTitle1>
        인기 컨텐츠
      </CarouselTitle1>
      {topVideoList && <PopularContents topVideoList={topVideoList} />}

      {/* 명예의 전당 */}
      <CarouselTitle2>
        명예의전당
      </CarouselTitle2>
      {bestDrawing && <HallofFame bestDrawing={bestDrawing} />}
      {/* <HallofFame></HallofFame> */}

      {/* Footer  */}
      <Footer />
    </Container>
  );
};

// style
const DummyDiv = styled.div(tw`h-16`);

const CarouselTitle1 = styled.div(
  tw`flex items-center justify-center text-3xl pt-16`,
  css`
    font-family: "insungitCutelivelyjisu";
  `
)
const CarouselTitle2 = styled.div(
  tw`flex items-center justify-center text-3xl`,
  css`
    font-family: "insungitCutelivelyjisu";
  `
)


export default MainPage;
