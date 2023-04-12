import React, { useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { keyframes } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow2 from "./NextArrow2";
import PrevArrow2 from "./PrevArrow2";

interface DrawingListType {
  userId: string;
  drawingPath: string;
  percentage: number;
  word: string;
  mean: string;
  nickName: string;
}

interface HallofFameProps {
  bestDrawing: DrawingListType[];
}

function HallofFame({ bestDrawing }: HallofFameProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow2 />,
    prevArrow: <PrevArrow2 />,
  };

  useEffect(() => {}, [bestDrawing]);

  return (
    <SectionWrapper>
      <CustomedSection className="page-carousel">
        <Slider
          tw="flex w-10/12 overflow-hidden justify-center items-center"
          {...settings}
        >
          {bestDrawing &&
            bestDrawing.map((item: any, index: number) => {
              return (
                <SliderItems key={index}>
                  <SliderItemsWrapper>
                    <NicknameDiv>
                      <NameTag>{item.nickName}</NameTag>
                    </NicknameDiv>
                    <CustomedFigure>
                      <FrameThumbnail>
                        {item.drawingPath && (
                          <FixedDiv>
                            <ItemDivWrapper>
                              <ItemDiv>
                                <ItemTag>{item.word}</ItemTag>
                              </ItemDiv>
                            </ItemDivWrapper>
                            <ThumbNail
                              src={`https://j8a103.p.ssafy.io/assets/img_backend/${item.drawingPath}`}
                            ></ThumbNail>
                          </FixedDiv>
                        )}
                        {!item.drawingPath && (
                          <NullImg>아직 그림이 없어요</NullImg>
                        )}
                      </FrameThumbnail>
                    </CustomedFigure>
                  </SliderItemsWrapper>
                  <ItemScoreDiv>
                    <ScoreDiv>
                      <ScoreTag>
                        {Math.round(item.percentage * 100) / 100}점
                      </ScoreTag>
                    </ScoreDiv>
                  </ItemScoreDiv>
                </SliderItems>
              );
            })}
        </Slider>
      </CustomedSection>
    </SectionWrapper>
  );
}

export default HallofFame;

const CustomedSection = styled.section(
  tw`flex justify-center w-full items-center`
);

const SectionWrapper = styled.div(
  tw`flex justify-center w-full h-96 py-24 items-center`
);

const SliderItems = styled.li(tw`w-full`);

const SliderItemsWrapper = styled.div(
  tw`flex justify-center rounded-lg px-7 pb-4 h-full flex-col`
);

const FrameThumbnail = styled.div(
  tw`flex justify-center items-center`,
  css`
    border: 60px solid;
    border-image: url("/assets/border/Border_Final.png") 250 200;
  `
);

const FixedDiv = styled.div(tw`h-32 w-32`);

const ThumbNail = styled.img(tw`h-32 w-32 object-cover bg-white`);

const NullImg = styled.div(
  tw`flex justify-center items-center h-36 w-48 object-cover bg-slate-500 border-4 m-5`
);

const CustomedFigure = styled.figure`
  animation: swing ease-in-out 1s infinite alternate;
  transform-origin: center -20px;
  float: left;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  &:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #999;
    top: -10px;
    left: 46%;
    z-index: 0;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
  &:before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    top: -14px;
    left: 49%;
    z-index: 5;
    border-radius: 50% 50%;
    background: #000;
  }
  @keyframes swing {
    0% {
      transform: rotate(3deg);
    }
    100% {
      transform: rotate(-3deg);
    }
  }
`;

const ItemScoreDiv = styled.div(
  tw`flex justify-center rounded-lg px-10 h-full`
);

const ItemDivWrapper = styled.div(
  tw`absolute`,
  css`
    width: 8rem;
    top: 2rem;
  `
);
const ItemDiv = styled.div(tw`flex items-start justify-center top-5`);

const ScoreDiv = styled.div(tw`flex`);

const NicknameDiv = styled.div(tw`flex justify-center rounded-lg p-5 h-full`);

const NameTag = styled.div(
  tw`flex justify-center`,
  css`
    height: 100%;
    border-radius: 10px;
    font-family: "insungitCutelivelyjisu";
    font-size: 1.5vw;
    padding: 5px 13px 5px 10px;
  `
);

const ScoreTag = styled.div(
  tw`flex justify-center`,
  css`
    height: 100%;
    border-radius: 10px;
    font-family: "PyeongChangPeace-Light";
    font-size: 1vw;
    padding: 5px 13px 5px 10px;
  `
);

const ItemTag = styled.div(
  tw`flex justify-center`,
  css`
    height: 100%;
    border-radius: 10px;
    font-family: "ONE-Mobile-POP";
    font-size: 1vw;
    padding: 5px 13px 5px 10px;
  `
);
