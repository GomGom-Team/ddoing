import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow2 from "./NextArrow2";
import PrevArrow2 from "./PrevArrow2"

interface Popularprops {
  Thumbnail : string,
  title : string,
  description : string
}


function PopularContents() {
	const settings = {
    	dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <NextArrow2 />,
      prevArrow: <PrevArrow2 />,
    }

    return(
      <SectionWrapper>
      <CustomedSection>
        <Slider  tw="flex w-10/12 overflow-hidden justify-center items-center" {...settings}>
          
          <SliderItems>
            <SliderItemsWrapper>
              <ThumbNail></ThumbNail>
              <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
              <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
            </SliderItemsWrapper>
          </SliderItems>
          
          <SliderItems>
            <SliderItemsWrapper>
              <ThumbNail></ThumbNail>
              <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
              <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
            </SliderItemsWrapper>
          </SliderItems>
          
          <SliderItems>
            <SliderItemsWrapper>
              <ThumbNail></ThumbNail>
              <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
              <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
            </SliderItemsWrapper>
          </SliderItems>
          
          <SliderItems>
            <SliderItemsWrapper>
              <ThumbNail></ThumbNail>
              <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
              <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
            </SliderItemsWrapper>
          </SliderItems>
          
          <SliderItems>
            <SliderItemsWrapper>
              <ThumbNail></ThumbNail>
              <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
              <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
            </SliderItemsWrapper>
          </SliderItems>
          
          <SliderItems>
            <SliderItemsWrapper>
              <ThumbNail></ThumbNail>
              <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
              <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
            </SliderItemsWrapper>
          </SliderItems>
          
          <SliderItems>
            <SliderItemsWrapper>
              <ThumbNail></ThumbNail>
              <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
              <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
            </SliderItemsWrapper>
          </SliderItems>

        </Slider>
      </CustomedSection>
      </SectionWrapper>
    )
}

export default PopularContents;

const CustomedSection = styled.div(
  tw`flex justify-center w-full items-center`
)

const SectionWrapper = styled.div(
  tw`flex justify-center w-full py-20 items-center`
)

const SliderItems = styled.li(
  tw`w-96 p-5`
)

const SliderItemsWrapper = styled.div(
  tw`border rounded-lg p-5 h-full`
)

const ThumbNail = styled.img(
  tw`h-44 w-full object-cover rounded-md bg-slate-500`
)

const ThumbNailTitle = styled.h2(
  tw`mt-2 text-2xl font-bold text-gray-700`
)

const ThumbNailDescription = styled.p(
  tw`truncate mt-2 text-gray-500`
)
