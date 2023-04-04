import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import banner_ddoing_img from "/assets/img/banner_ddoing_img2.png";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const LandingComp1 = () => {
  return (
    <Background>
      <TitleDescriptionWrapper data-aos="fade-up">
        <StyledTitle>우리 아이 영어 학습을 위한 선택, 또잉</StyledTitle>
        <div>
          <StyledDescription>애니메이션을 보며 따라하고,</StyledDescription>
          <StyledDescription>영어 단어를 직접 그려보면서</StyledDescription>
          <StyledDescription>
            자연스럽게 영어를 학습할 수 있습니다.
          </StyledDescription>
          <br />
          <StyledDescription>
            또잉과 함께 즐거운 영어 공부해요!
          </StyledDescription>
        </div>
      </TitleDescriptionWrapper>
    </Background>
  );
};
export default LandingComp1;

const BoxStyle = styled.div`
  width: 40%;
  height: 30%;
`;

const Background = styled.div`
  /* background: #ffd761; */
  height: 50%;
`;

const BackgroundDiv = styled.div(
  tw`flex bg-yellowD w-full h-96 justify-between`
);

const TitleDescriptionWrapper = styled.div(
  tw`flex flex-col justify-evenly pl-48`
);

const StyledTitle = styled.h2(
  tw`mt-2 text-4xl font-bold text-gray-700`,
  css`
    font-family: "One-Mobile-POP";
    padding-top: 15px;
    padding-bottom: 20px;
    margin-top: 20px;
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
