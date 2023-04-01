import React, { useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow2 from "./NextArrow2";
import PrevArrow2 from "./PrevArrow2";
import { animationTop6GetAction } from "../../redux/modules/animation";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { useNavigate } from "react-router-dom";

interface Popularprops {
  Thumbnail: string;
  title: string;
  description: string;
}

function PopularContents() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);
  if (user !== null) {
    useEffect(() => {
      dispatch(animationTop6GetAction(user.id));
    }, [user]);
  }
  const topVideoList = useAppSelector(
    (state) => state.animation.getAnimationTop6
  );
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
          {topVideoList?.data?.map((item: any, index: number) => {
            return (
              <SliderItems key={index}>
                <SliderItemsWrapper
                  onClick={() => navigate(`/video/${item.id}`)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.pathUrl}/0.jpg`}
                  />
                  <ThumbNailTitle>{item.title}</ThumbNailTitle>
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

const SectionWrapper = styled.div(
  tw`flex justify-center w-full py-20 items-center`
);

const SliderItems = styled.li(tw`w-96 p-5`);

const SliderItemsWrapper = styled.button(tw`border rounded-lg p-5 h-full`);

const ThumbNail = styled.img(
  tw`h-44 w-full object-cover rounded-md bg-slate-500`
);

const ThumbNailTitle = styled.h2(tw`mt-2 text-2xl font-bold text-gray-700`);

const ThumbNailDescription = styled.p(tw`truncate mt-2 text-gray-500`);
