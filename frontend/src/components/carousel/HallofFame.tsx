import React, { useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow2 from "./NextArrow2";
import PrevArrow2 from "./PrevArrow2"

interface DrawingListType {
  userId: string
  drawingPath: string
  percentage: number
  word: string
  mean: string
}

interface HallofFameProps {
  bestDrawing: DrawingListType[]

}

function HallofFame({ bestDrawing } : HallofFameProps) {
	const settings = {
    	dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow2 />,
        prevArrow: <PrevArrow2 />,
    }

    useEffect(()=>{

    },[bestDrawing])

    return(
      <SectionWrapper>
      <CustomedSection className="page-carousel">
        <Slider  tw="flex w-10/12 overflow-hidden justify-center items-center" {...settings}>

          <SliderItems>
              <SliderItemsWrapper>
                <CustomedFigure>
                  <ThumbNail src={bestDrawing[0].drawingPath}></ThumbNail>
                </CustomedFigure>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                <CustomedFigure>
                  <ThumbNail src={bestDrawing[1].drawingPath}></ThumbNail>
                </CustomedFigure>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                <CustomedFigure>
                  <ThumbNail src={bestDrawing[2].drawingPath}></ThumbNail>
                </CustomedFigure>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                <CustomedFigure>
                  <ThumbNail src={bestDrawing[3].drawingPath}></ThumbNail>
                </CustomedFigure>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                <CustomedFigure>
                  <ThumbNail src={bestDrawing[4].drawingPath}></ThumbNail>
                </CustomedFigure>
              </SliderItemsWrapper>
          </SliderItems>

          <SliderItems>
              <SliderItemsWrapper>
                <CustomedFigure>
                  <ThumbNail src={bestDrawing[5].drawingPath}></ThumbNail>
                </CustomedFigure>
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
    tw`h-56 w-56 object-cover bg-slate-500 border-4`
  )

const CustomedFigure = styled.figure`
  animation: swing ease-in-out 1s infinite alternate;
  transform-origin: center -20px;
  float:left;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  &:after{
  content: '';
  position: absolute;  
  width: 20px; height: 20px;  
  border: 1px solid #999;
  top: -10px; left: 50%;
  z-index: 0;
  border-bottom: none;
  border-right: none;
  transform: rotate(45deg);
  }
  &:before{
  content: '';
  position: absolute;
  width: 5px; height: 5px;
  top: -14px;left: 54%;
  z-index: 5;
  border-radius: 50% 50%;
  background: #000;
  }
  @keyframes swing {
    0% { transform: rotate(3deg); }
    100% { transform: rotate(-3deg); }
  }
  `
