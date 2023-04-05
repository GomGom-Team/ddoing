import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import abc_img from "/assets/img/ABC.png";

const LandingComp2 = () => {
  return (
    <Background>
      <TitleDescriptionWrapper data-aos="fade-up">
        <Content>
          <StyledTitle>우리 아이 영어 학습을 위한 선택, 또잉</StyledTitle>
          <StyledDescription>애니메이션을 보며 따라하고,</StyledDescription>
          <StyledDescription>영어 단어를 직접 그려보면서</StyledDescription>
          <StyledDescription>
            자연스럽게 영어를 학습할 수 있습니다.
          </StyledDescription>
          <br />
          <StyledDescription>
            또잉과 함께 즐거운 영어 공부해요!
          </StyledDescription>
        </Content>
        <ImgWrapper>
          <CustomedImage src={abc_img}></CustomedImage>
        </ImgWrapper>
      </TitleDescriptionWrapper>
    </Background>
  );
};
export default LandingComp2;

const BoxStyle = styled.div`
  width: 40%;
  height: 30%;
`;

const Background = styled.div`
  background: #5bb83f;
  padding: 25vh;
  height: 100vh;
`;

const BackgroundDiv = styled.div(
  tw`flex bg-yellowD w-full h-96 justify-between`
);

const TitleDescriptionWrapper = styled.div(
  tw`justify-evenly pl-48`,
  css`
    margin-top: 30px;
    display: flex;
  `
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
  tw`object-cover rounded-md`,
  css`
    width: 40rem;
  `
);

const Content = styled.div`
  padding-right: 10vw;
`;

const IconStyle = {
  marginTop: "23vh",
  marginLeft: "2vw",
  right: "50%",
  fontSize: "70px",
  color: "#005112",
};
