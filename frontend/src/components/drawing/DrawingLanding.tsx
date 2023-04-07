import React from "react";
import tw, { css, styled, theme } from "twin.macro";
// import { Button } from "../common/index";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
interface landingProps {
  landingHandler(): void;
  anchor: Anchor;
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  // toggleDrawer: (anchor: Anchor, open: boolean)  => void;
}

type Anchor = "top";

const DrawingLanding = ({ toggleDrawer, anchor }: landingProps) => {
  return (
    <StyledDiv>
      <AllDiv>
        <Background src={"/assets/img/drawing_landing.png"} />
        <StyledBox>
          <FlexDiv>
            <StyledButton onClick={toggleDrawer(anchor, true)}>
              그림 그리기
            </StyledButton>
          </FlexDiv>
        </StyledBox>
      </AllDiv>
    </StyledDiv>
  );
};

export default DrawingLanding;

const StyledDiv = styled.div(
  tw`flex items-center justify-center object-center`
  // css`
  //   padding-top: 5em;
  // `
);

const Background = styled.img(tw`object-cover`);

const StyledBox = styled.div(tw`flex`);
const AllDiv = styled.div`
  /* position:absolute, */
  width: 90vw;
  height: 95vh;
  background-repeat: no-repeat;
  background-size: cover;
  /* padding-top: 5em; */
`;
const FlexDiv = styled.div`
  position: fixed;
  left: 43%;
  right: 50%;
  top: 80%;
`;

const Title = styled.div(tw`text-3xl text-center`);

const Description = styled.div(tw`text-2xl text-center mt-16`);

const StyledButton = muistyled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: "insungitCutelivelyjisu",
  backgroundColor: "#FFD761",
  color: "black",
  fontSize: "40px",
  padding: "0px 50px",
  width: "300px",
  border: "3px solid",
  // width: "50%",
  borderRadius: "5%",
  "&:hover": {
    backgroundColor: "#005112",
    borderColor: "#005112",
    boxShadow: "none",
    color: "#FFFFFF",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#005112",
    borderColor: "#005112",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem #005112",
  },
}));
