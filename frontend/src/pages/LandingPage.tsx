import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import tw, { css, styled, theme } from "twin.macro";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Container, Header, Footer } from "../components/common/index";
import "aos/dist/aos.css";
import abc_img from "/assets/img/LOGO2.png";
import LandingComp1 from "../components/land/LandingComp1";
import LandingComp2 from "../components/land/LandingComp2";
import LandingComp3 from "../components/land/LandingComp3";
import LandingComp4 from "../components/land/LandingComp4";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  });

  return (
    <div>
      <ExtraBox style={{ textAlign: "center" }}>
        <FloatLogo src={abc_img} style={{ width: "200px" }} />
        <LandingComp1 />
        <LandingComp2 />
        <LandingComp3 />
        <LandingComp4 />
        <Float>
          <StyledButton onClick={() => navigate("/login")}>START</StyledButton>
        </Float>
      </ExtraBox>
    </div>
  );
};

export default LandingPage;

const ExtraBox = styled.div`
  height: 400vh;
`;

const StyledButton = muistyled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: "insungitCutelivelyjisu",
  backgroundColor: "#FFD761",
  color: "black",
  fontSize: "40px",
  padding: "0px 80px",
  // border: "1px solid",
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

const Float = styled.div`
  position: fixed;
  left: 43%;
  right: 50%;
  top: 80%;
  /* margin-left: 50vw;
  margin-right: 50vw; */
  text-align: center;
  /* width: 120px; */
`;

const FloatLogo = styled.img`
  position: fixed;
  width: "20px";
  height: "3rem";
  left: 1em;
  top: 1em;
  /* width: 120px; */
`;
