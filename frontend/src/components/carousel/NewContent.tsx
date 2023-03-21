import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { Button } from '../common/index'

// interface

const NewContent = () => {
// State

// Logic

// HTML
  return (
  <BackgroundDiv>
    <TitleDescriptionWrapper>
      <StyledTitle>신규 컨텐츠</StyledTitle>
      <div>
        <StyledDescription>
          뽀로로 컨텐츠가 업데이트되었습니다.
        </StyledDescription>
        <StyledDescription>
          새로운 컨텐츠를 즐겨보세요!
        </StyledDescription>
      </div>
      <Button variant="third"></Button>
    </TitleDescriptionWrapper>
    <ImgWrapper>
      <CustomedImage></CustomedImage>
    </ImgWrapper>
  </BackgroundDiv>
  );
}


// style

const BackgroundDiv = styled.div(
  tw`flex bg-yellowD w-full h-96 justify-between`
)

const TitleDescriptionWrapper = styled.div(
  tw`flex flex-col justify-evenly pl-48`
)

const StyledTitle = styled.h2(
  tw`mt-2 text-2xl font-bold text-gray-700`
)

const StyledDescription = styled.h2(
  tw`text-xl text-gray-700`
)


const ImgWrapper = styled.div(
  tw`flex justify-center items-center pr-48`
)

const CustomedImage = styled.img(
  tw`h-64 object-cover rounded-md bg-slate-500`,
  css`
    width: 30rem;
  `
)
export default NewContent