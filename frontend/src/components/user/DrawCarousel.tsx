import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow2 from "../carousel/NextArrow2";
import PrevArrow2 from "../carousel/PrevArrow2"



function DrawCarousel() {
	const settings = {
    	dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow2 />,
        prevArrow: <PrevArrow2 />,
    }

    return(
      <SectionWrapper>
      <CustomedSection className="page-carousel">
        <Slider  tw="flex w-10/12 overflow-hidden justify-center items-center" {...settings}>

        {/* {drawList.map((item: any, index: number) => {
          return(
          <SliderItems key={index}>
            <SliderItemsWrapper>
              
            </SliderItemsWrapper>
          </SliderItems>
          )
        })} */}


        </Slider>
      </CustomedSection>
      </SectionWrapper>
    )
}

export default DrawCarousel;

const CustomedSection = styled.section(
    tw`flex justify-center w-full items-center`
)

const SectionWrapper = styled.div(
    tw`flex justify-center w-full items-center`,
)

const SliderItems = styled.li(
  tw`flex`,
)

const SliderItemsWrapper = styled.div(
  tw`flex justify-center rounded-lg h-full`
)