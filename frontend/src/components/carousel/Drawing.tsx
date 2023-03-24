import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { Button } from '../common/index'
import { useNavigate } from 'react-router-dom';

// interface

const Drawing = () => {
// State
const navigate = useNavigate();
// Logic

// HTML
  return (
  <BackgroundDiv>
    <TitleDescriptionWrapper>
      <StyledTitle>그림 그리기</StyledTitle>
      <div>
        <StyledDescription>
          그림을 그려볼 수 있습니다.
        </StyledDescription>
        <StyledDescription>
          지금 바로 하러 가볼까요?
        </StyledDescription>
      </div>
      <Button variant="primary" onClick={()=>navigate("drawing")}>Go</Button>
    </TitleDescriptionWrapper>
    <ImgWrapper>
      <CustomedImage></CustomedImage>
    </ImgWrapper>
  </BackgroundDiv>
  );
}


// style

const BackgroundDiv = styled.div(
  tw`flex bg-greenC w-full h-96 justify-between`
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
export default Drawing