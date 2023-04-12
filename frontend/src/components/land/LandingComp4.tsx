import React, { useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import shiba1 from "/assets/img/shiba_landing.png";
import shiba2 from "/assets/img/shiba_landing2.png";
import shiba3 from "/assets/img/shiba_landing3.png";
import shiba4 from "/assets/img/shiba_profile.png";
import AOS from "aos";

const LandingComp1 = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <Background style={{ textAlign: "center" }}>
      <TitleDescriptionWrapper data-aos="fade-up">
        <Content>
          <StyledTitle>
            경험치와 레벨 보상으로 <br /> 다양한 프로필도 얻을 수 있습니다
          </StyledTitle>
          <ContentScript>
            <StyledDescription>경험치를 통해 레벨을 올리고</StyledDescription>
            <StyledDescription>다양한 시바 프로필을 획득해</StyledDescription>
            <StyledDescription>자신의 프로필을 꾸며보세요</StyledDescription>
          </ContentScript>
        </Content>
        <ImgWrapper>
          <CustomedImage
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1500"
            src={shiba1}
            style={{ width: "500px", top: "5vh", left: "10vw", zIndex: 2 }}
          ></CustomedImage>
          <CustomedImage
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="1500"
            src={shiba2}
            style={{ width: "500px", top: "25vh", left: "25vw", zIndex: 3 }}
          ></CustomedImage>
          <CustomedImage
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="1500"
            src={shiba3}
            style={{ width: "500px", top: "40vh", left: "15vw", zIndex: 4 }}
          ></CustomedImage>
          <CustomedImage
            data-aos="fade-up"
            data-aos-delay="1500"
            data-aos-duration="1500"
            src={shiba4}
            style={{ width: "300px", top: "47vh", left: "35vw", zIndex: 5 }}
          ></CustomedImage>
        </ImgWrapper>
      </TitleDescriptionWrapper>
    </Background>
  );
};
export default LandingComp1;

const Background = styled.div`
  background: #5bb83f;
  /* padding: 15vh 15vh 0px 15vh; */
  z-index: 0;
  height: 100vh;
`;

const TitleDescriptionWrapper = styled.div`
  top: 10em;
  padding-top: 10vh;
  margin-bottom: 30em;
  display: flex;
`;

const StyledTitle = styled.h2(
  tw`mt-2 text-4xl font-bold text-gray-700`,
  css`
    font-family: "One-Mobile-POP";
    padding-top: 3em;
    padding-bottom: 20px;
    margin-top: 20px;
  `
);

const StyledDescription = styled.h2(
  tw`text-3xl text-gray-700`,
  css`
    width: "10px";
    font-family: "ONE-Mobile-Regular";
  `
);

const ImgWrapper = styled.div`
  position: relative;
  width: 500px;
`;

const CustomedImage = styled.img(
  tw`object-cover rounded-md`,
  css`
    position: absolute;
    top: 15em;
    left: 15em;
    width: 500px;
  `
);

const Content = styled.div`
  padding-left: 10vw;
  padding-top: 20vh;
  /* margin-left: 5em; */
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
  /* width: 400px; */
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
