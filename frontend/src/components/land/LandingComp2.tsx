import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import abc_img from "/assets/img/LANDING2-3.png";

const LandingComp2 = () => {
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
export default LandingComp2;

const Background = styled.div`
  height: 100vh;
`;

const TitleDescriptionWrapper = styled.div(
  tw`justify-evenly`,
  css`
    /* padding-top: 1em; */
    /* padding-right: 5em; */
    display: flex;
  `
);

// const ImgWrapper = styled.div(tw`flex justify-center items-center pr-48`);

const CustomedImage = styled.img(
  tw`object-cover rounded-md`,
  css`
    height: 50rem;
  `
);
