import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import tw, { css, styled, theme } from "twin.macro";
import { styled as muistyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Container, Header, Footer } from "../components/common/index";
import "aos/dist/aos.css";
import abc_img from "/assets/img/ABC2.png";
import LandingComp1 from "../components/land/LandingComp1";
import LandingComp2 from "../components/land/LandingComp2";
import LandingComp3 from "../components/land/LandingComp3";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  });

  return (
    <div>
      <FloatLogo src={abc_img} />
      <ExtraBox style={{ textAlign: "center" }}>
        <LandingComp1 />
        <LandingComp2 />
        <LandingComp3 />
        <Float>
          <StyledButton onClick={() => navigate("/login")}>START</StyledButton>
        </Float>
        <div style={{ height: "500px" }}></div>
      </ExtraBox>
      //{" "}
    </div>
  );
};

export default LandingPage;
const BoxStyle = styled.div`
  width: 40%;
  height: 200px;
  fontsize: 30px;
  lineheight: 200px;
  color: white;
  textalign: center;
`;

const ExtraBox = styled.div`
  height: 300vh;
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
  margin-right: 50%;
  text-align: center;
  /* width: 120px; */
`;

const FloatLogo = styled.img`
  position: fixed;
  right: 70%;
  top: 80%;
  /* width: 120px; */
`;
