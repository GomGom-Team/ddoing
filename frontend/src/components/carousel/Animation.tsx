import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { Button } from "../common/index";
import { useNavigate } from "react-router-dom";
import banner_animation_img from "/assets/img/banner_animation_img2.jpg";

// interface

const Animation = () => {
  // State
  const navigate = useNavigate();
  // Logic

  // HTML
  return (
    <BackgroundDiv>
      <TitleDescriptionWrapper>
        <StyledTitle>애니메이션으로 배우는 즐거운 영어 말하기</StyledTitle>
        <div>
          <StyledDescription>
            애니메이션으로 재밌게, AI 발음 평가로 똑똑하게
          </StyledDescription>
          <StyledDescription>
            영어 말하기 학습을 할 수 있습니다.
          </StyledDescription>
          <br />
          <StyledDescription>지금 바로 하러 가볼까요?</StyledDescription>
        </div>
        <Button variant="primary" onClick={() => navigate("animation")}>
          Go
        </Button>
      </TitleDescriptionWrapper>
      <ImgWrapper>
        <CustomedImage src={banner_animation_img}></CustomedImage>
      </ImgWrapper>
    </BackgroundDiv>
  );
};

// style

const BackgroundDiv = styled.div(tw`flex bg-blueC w-full h-96 justify-between`);

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
export default Animation;
