import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import abc_img from "/assets/img/LOGO.png";
import { Height } from "@mui/icons-material";

const LandingComp5 = () => {
  return (
    <Background style={{ textAlign: "center" }}>
      <TitleDescriptionWrapper>
        {/* <ImgWrapper> */}
        <CustomedImage src={abc_img} style={{ width: "80vh" }}></CustomedImage>
        {/* </ImgWrapper> */}
      </TitleDescriptionWrapper>
      <Bounce>
        <KeyboardDoubleArrowDownIcon sx={IconStyle} />
      </Bounce>
    </Background>
  );
};
export default LandingComp5;

const Background = styled.div`
  background: #ffd761;
  padding: 15vh 15vh 0px 15vh;
  height: 100vh;
`;

const TitleDescriptionWrapper = styled.div(
  tw`justify-evenly`,
  css`
    margin-top: 15vh;
    /* margin-bottom: 30em; */
    display: flex;
  `
);

const CustomedImage = styled.img(
  tw`object-cover rounded-md animate-bounce hover:delay-700 hover:animate-spin `,
  css`
    width: 500px;
  `
);

const IconStyle = {
  fontSize: "70px",
  color: "#005112",
};

const Bounce = styled.div(
  tw`animate-pulse`,
  css`
    position: "absolute";
    /* position: fixed; */
    left: 43%;
    right: 50%;
    padding-top: 25vh;
    /* margin-left: 50vw;
  margin-right: 50vw; */
    text-align: center;
  `
);
