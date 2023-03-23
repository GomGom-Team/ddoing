import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow2 from "./NextArrow2";
import PrevArrow2 from "./PrevArrow2"


function HallofFame() {
	const settings = {
    	dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow2 />,
        prevArrow: <PrevArrow2 />,
    }

    return(
      <SectionWrapper>
      <CustomedSection className="page-carousel">
        <Slider  tw="flex w-10/12 overflow-hidden justify-center items-center" {...settings}>

          <SliderItems>
              <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
              </SliderItemsWrapper>
          </SliderItems>
        </Slider>
      </CustomedSection>
      </SectionWrapper>
    )
}

export default HallofFame;

const CustomedSection = styled.section(
    tw`flex justify-center w-full items-center`
)

const SectionWrapper = styled.div(
    tw`flex justify-center w-full pb-24 items-center`
)

const SliderItems = styled.li(
  tw`w-96 p-5`,
)

const SliderItemsWrapper = styled.div(
  tw`flex justify-center rounded-lg p-5 h-full`
)

const ThumbNail = styled.img(
    tw`h-56 w-56 object-cover rounded-md bg-slate-500`
  )