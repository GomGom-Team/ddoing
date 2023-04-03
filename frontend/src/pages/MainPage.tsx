import React, { useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import {
  NewContent,
  Animation,
  Drawing,
  HallofFame,
  Banner,
  PopularContents,
} from "../components/carousel/index";
import { Container, Header, Footer } from "../components/common/index";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import { animationTop6GetAction } from "../redux/modules/animation";

const items = [<NewContent />, <Animation />, <Drawing />];

const MainPage = () => {
  const dispatch = useAppDispatch();
  const topVideoList = useAppSelector(
    (state) => state.animation.getAnimationTop6
  );
  useEffect(() => {
    dispatch(animationTop6GetAction());
  }, []);

  return (
    <Container isOverflowed>
      {/* Header */}
      <Header />
      <DummyDiv></DummyDiv>

      {/* Banner */}
      <Banner></Banner>
      {/* // Popular Contents */}
      <PopularContents videoList={topVideoList}></PopularContents>

      {/* 명예의 전당 */}
      <HallofFame></HallofFame>
      {/* <HallofFame></HallofFame> */}

      {/* Footer  */}
      <Footer />
    </Container>
  );
};

// style
const DummyDiv = styled.div(tw`h-16`);

export default MainPage;
