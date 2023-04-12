import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow2 from "./NextArrow2";
import PrevArrow2 from "./PrevArrow2";

interface wordListType {
  id: number;
  word: string;
  mean: string;
  engSentence: string;
  koSentence: string;
  picturePath: string;
}

interface resultPropsType {
  wordList: wordListType[];
  index: number;
}

function DrawingCard({ wordList, index }: resultPropsType) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow2 />,
    prevArrow: <PrevArrow2 />,
  };

  return (
    <SectionWrapper>
      <CustomedSection className="page-carousel">
        <Slider
          tw="flex w-10/12 overflow-hidden justify-center items-center"
          {...settings}
        >
          {wordList.map((item: any, index: number) => {
            return (
              <SliderItems key={index}>
                <SliderItemsWrapper>
                  <StyledDrawer>
                    <StyledDiv>
                      <DrawerBody1>
                        <WordDiv>
                          <WordEnglish>{item.word}</WordEnglish>
                          <WordKorean>{item.mean}</WordKorean>
                        </WordDiv>
                        <ImgWrapper>
                          <CustomedImage
                            src={`https://j8a103.p.ssafy.io/ec2/class_images/${item.picturePath}`}
                          ></CustomedImage>
                        </ImgWrapper>
                      </DrawerBody1>

                      <DrawerBody2>
                        <ExampleEnglish>{item.engSentence}</ExampleEnglish>
                        <ExampleKorean>{item.koSentence}</ExampleKorean>
                      </DrawerBody2>
                    </StyledDiv>
                  </StyledDrawer>
                </SliderItemsWrapper>
              </SliderItems>
            );
          })}
        </Slider>
      </CustomedSection>
    </SectionWrapper>
  );
}

export default DrawingCard;

const CustomedSection = styled.section(
  tw`flex justify-center w-full items-center`
);

const SectionWrapper = styled.div(tw`flex justify-center w-full items-center`);

const SliderItems = styled.li(tw`flex`);

const SliderItemsWrapper = styled.div(
  tw`flex justify-center rounded-lg h-full`
);

const StyledDrawer = styled.div(
  tw`flex justify-center items-center`,
  css`
    font-family: "insungitCutelivelyjisu";
    font-size: 24px;
  `
);

const StyledDiv = styled.div(
  tw`rounded-3xl border-4 border-brownD`,
  css`
    width: 30rem;
    height: 25rem;
  `
);

const DrawerBody1 = styled.div(tw`flex justify-center p-5`);

const WordDiv = styled.div(tw`flex flex-col items-center justify-center`);

const WordEnglish = styled.p(tw`text-2xl mb-5 font-bold`);

const WordKorean = styled.p(tw`text-xl`);

const ImgWrapper = styled.div(tw`flex justify-center items-center pl-10 ml-10`);

const CustomedImage = styled.img(
  tw`object-cover rounded-md bg-slate-500`,
  css`
    height: 150px;
    width: 200px;
  `
);

const DrawerBody2 = styled.div(tw`flex flex-col items-center p-10`);

const ExampleEnglish = styled.p(tw`mb-5 font-bold text-lg`);

const ExampleKorean = styled.p(tw`text-lg`);
