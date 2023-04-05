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
      <TitleDescriptionWrapper data-aos="fade-up" data-aos-delay="100">
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

const BackgroundDiv = styled.div(
  tw`flex bg-yellowD w-full h-96 justify-between`
);

const TitleDescriptionWrapper = styled.div(
  tw`justify-evenly pl-48`,
  css`
    margin-top: 5em;
    /* margin-bottom: 30em; */
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
  tw`object-cover rounded-md animate-bounce hover:delay-700 hover:animate-spin `,
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
  tw`animate-pulse`,
  css`
    position: "absolute";
    /* left: 43%; */
    /* right: 50%; */
    /* top: 660em; */
    /* bottom: 10em; */
    /* margin-right: 50%; */
    text-align: center;
  `
);
