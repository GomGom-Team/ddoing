import tw, { css, styled, theme } from "twin.macro";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow2 from "./NextArrow2";
import PrevArrow2 from "./PrevArrow2";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/configStore.hooks";

interface TopVideoListType {
  id: number;
  title: string;
  runningTime: number;
  pathUrl: string;
  bestScore: number | null;
  roles: string[];
}
interface PopularContentsType {
  topVideoList: TopVideoListType[];
}

function PopularContents({ topVideoList }: PopularContentsType) {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.userData);
  const isLogin = useAppSelector((state) => state.user.userData.isLoggedIn);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow2 />,
    prevArrow: <PrevArrow2 />,
  };

  return (
    <SectionWrapper>
      <CustomedSection>
        <Slider
          tw="flex w-10/12 overflow-hidden justify-center items-center"
          {...settings}
        >
          {topVideoList?.map((item: any, index: number) => {
            return (
              <SliderItems key={index}>
                <SliderItemsWrapper
                  onClick={() => {
                    // navigate(`/video/${item.id}`);
                    if (!isLogin) {
                      navigate("/login");
                    } else {
                      navigate(`/video/${item.id}`);
                    }
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
                  />
                  <ThumbNailTitle>{item.title.split(" - ")[1]}</ThumbNailTitle>
                  <ThumbNailDescription></ThumbNailDescription>
                </SliderItemsWrapper>
              </SliderItems>
            );
          })}
        </Slider>
      </CustomedSection>
    </SectionWrapper>
  );
}

export default PopularContents;

const CustomedSection = styled.div(tw`flex justify-center w-full items-center`);

const SectionWrapper = styled.div(tw`flex justify-center w-full items-center`);

const SliderItems = styled.li(tw`w-96 p-5`);

const SliderItemsWrapper = styled.button(
  tw`border rounded-lg h-full`,
  css`
    padding: 1vw;
  `
);

// const FrameThumbnail = styled.div(
//   tw`flex justify-center items-center`,
//   css`
//     border: 40px solid;
//     border-image: url("/assets/border/Border3.png") 50 64;
//   `
// );

const ThumbNailTitle = styled.h2(
  tw`mt-2 text-2xl font-bold text-gray-700`,
  css`
    font-family: "ONE-Mobile-Title";
  `
);

const ThumbNailDescription = styled.p(tw`truncate mt-2 text-gray-500`);
