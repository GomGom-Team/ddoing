import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { Button } from "../common/index";
import { useNavigate } from "react-router-dom";
import banner_drawing_img from "/assets/img/banner_drawing_disney2.png";

// interface

const Drawing = () => {
  // State
  const navigate = useNavigate();
  // Logic

  // HTML
  return (
    <BackgroundDiv>
      <TitleDescriptionWrapper>
        <StyledTitle>그리면서 배우는 영단어</StyledTitle>
        <div>
          <StyledDescription>
            제시된 영어 단어에 해당하는 그림을 그리면 AI가 답을 맞춰요!
          </StyledDescription>
          <StyledDescription>
            그림을 그리면서 단어와 예문까지 학습할 수 있습니다.
          </StyledDescription>
          <br />
          <StyledDescription>지금 바로 하러 가볼까요?</StyledDescription>
        </div>
        <Button variant="primary" onClick={() => navigate("drawing")}>
          Go
        </Button>
      </TitleDescriptionWrapper>
      <ImgWrapper>
        <CustomedImage src={banner_drawing_img}></CustomedImage>
      </ImgWrapper>
    </BackgroundDiv>
  );
};

// style

const BackgroundDiv = styled.div(
  tw`flex bg-greenC w-full justify-between`,
  css`
    height: 30rem;
  `
);

const TitleDescriptionWrapper = styled.div(
  tw`flex flex-col justify-evenly pl-48`
);

const StyledTitle = styled.h2(
  tw`mt-2 text-4xl font-bold text-gray-700`,
  css`
    font-family: "One-Mobile-POP";
    padding-top: 10px;
  `
);

const StyledDescription = styled.h2(
  tw`text-2xl text-gray-700`,
  css`
    font-family: "ONE-Mobile-Regular";
  `
);

const ImgWrapper = styled.div(tw`flex justify-center items-center pr-48`);

const CustomedImage = styled.img(
  tw`h-64 object-cover rounded-md bg-slate-500`,
  css`
    width: 30rem;
  `
);
export default Drawing;
