import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow"
import { NewContent, Animation, Drawing } from './index'


function Banner() {
	const settings = {
    	dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: (dots: any) => (
          <div
            style={{
              width: '100%',
              position: 'absolute',
              bottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ul> {dots} </ul>
          </div>
        ),
    }

    return(
      <SectionWrapper>
      <CustomedSection className="page-carousel">
        <Slider  tw="flex" {...settings}>
          <NewContent />
          <Animation />
          <Drawing />
        </Slider>
      </CustomedSection>
      </SectionWrapper>
    )
}

export default Banner;

const CustomedSection = styled.section(
  tw`w-full`
)

const SectionWrapper = styled.div(
  tw`flex justify-center w-full `
)
