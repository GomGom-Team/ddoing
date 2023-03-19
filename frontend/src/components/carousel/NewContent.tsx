import React from "react";
import tw, { styled } from "twin.macro";

// interface

const NewContent = () => {
// State

// Logic

// HTML
  return (
    <CarouselSlide id="slide1">
      <CarouselDiv>

      </CarouselDiv>
      <TanslateDiv>
        <NextCarousel href="#slide4">❮</NextCarousel> 
        <NextCarousel href="#slide2">❯</NextCarousel>
      </TanslateDiv>
    </CarouselSlide> 
  );
}

// styles
const CarouselSlide = styled.div(
  tw`carousel-item relative w-full`
)

const CarouselDiv = styled.div(
  tw`bg-greenC w-full`
)

const TanslateDiv = styled.div(
  tw`absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2`
)

const NextCarousel = styled.a(
  tw``
)


export default NewContent