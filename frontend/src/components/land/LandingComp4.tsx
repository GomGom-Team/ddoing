import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import abc_img from "/assets/img/ABC.png";
import { Height } from "@mui/icons-material";

const LandingComp4 = () => {
  return (
    <Background style={{ textAlign: "center" }}>
      <TitleDescriptionWrapper data-aos="fade-up">
        <Content>
          <StyledTitle>우리 아이 영어 학습을 위한 선택, 또잉</StyledTitle>
          <ContentScript>
            <StyledDescription>애니메이션을 보며 따라하고,</StyledDescription>
            <StyledDescription>영어 단어를 직접 그려보면서</StyledDescription>
            <StyledDescription>
              자연스럽게 영어를 학습할 수 있습니다.
            </StyledDescription>
            <br />
            <StyledDescription>
              또잉과 함께 즐거운 영어 공부해요!
            </StyledDescription>
          </ContentScript>
        </Content>
        {/* <ImgWrapper> */}
        <CustomedImage src={abc_img} style={{ width: "500px" }}></CustomedImage>
        {/* </ImgWrapper> */}
      </TitleDescriptionWrapper>
    </Background>
  );
};
export default LandingComp4;

const Background = styled.div`
  padding: 15vh 15vh 0px 15vh;
  height: 100vh;
`;

const BackgroundDiv = styled.div(
  tw`flex bg-yellowD w-full h-96 justify-between`
);

const TitleDescriptionWrapper = styled.div(
  tw`justify-evenly pl-48`,
  css`
    margin-top: 5em;
    margin-bottom: 35em;
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
    width: "10px";
    font-family: "ONE-Mobile-Regular";
  `
);

// const ImgWrapper = styled.div(tw`flex justify-center items-center pr-48`);

const CustomedImage = styled.img(
  tw`object-cover rounded-md`,
  css`
    width: 500px;
  `
);

const Content = styled.div`
  margin-right: 5em;
`;

const IconStyle = {
  // marginTop: "23vh",
  // marginLeft: "0.7em",
  // right: "50px",
  // textAlign: "center",
  fontSize: "70px",
  color: "#005112",
};

const ContentScript = styled.div`
  width: 400px;
`;

const Bounce = styled.div(
  tw`animate-bounce`,
  css`
    position: "absolute";
    /* left: 43%; */
    /* right: 50%; */
    /* top: 80%; */
    bottom: 10em;
    /* margin-right: 50%; */
    text-align: center;
  `
);
