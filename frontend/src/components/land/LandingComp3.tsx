import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import abc_img from "/assets/img/LANDING2.png";

const LandingComp3 = () => {
  return (
    <Background>
      <TitleDescriptionWrapper
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="800"
      >
        {/* <ImgWrapper> */}
        <CustomedImage src={abc_img}></CustomedImage>
        {/* </ImgWrapper> */}
      </TitleDescriptionWrapper>
    </Background>
  );
};
export default LandingComp3;

const BoxStyle = styled.div`
  width: 40%;
  height: 30%;
`;

const Background = styled.div`
  /* background: #5bb83f; */
  /* padding: 25vh; */
  height: 100vh;
`;

const BackgroundDiv = styled.div(
  tw`flex bg-yellowD w-full h-96 justify-between`
);

const TitleDescriptionWrapper = styled.div(
  tw`justify-evenly pl-48`,
  css`
    /* margin-top: 30em; */
    padding-top: 10em;
    padding-right: 5em;
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

// const ImgWrapper = styled.div(tw`flex justify-center items-center pr-48`);

const CustomedImage = styled.img(
  tw`object-cover rounded-md`,
  css`
    height: 50rem;
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
