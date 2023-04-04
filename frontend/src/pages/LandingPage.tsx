import React, { useEffect } from "react";
import AOS from "aos";
import tw, { css, styled, theme } from "twin.macro";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div>
      <div>
        <div>
          <p data-aos="fade-up">AOS 테스트1</p>
        </div>
        <div style={{ height: "500px" }}></div>
        <BoxStyle>
          <p data-aos="fade-up">AOS 테스트2</p>
        </BoxStyle>
        <div style={{ height: "500px" }}></div>
        <BoxStyle data-aos="fade-up">
          <p>AOS 테스트3</p>
        </BoxStyle>
        <div style={{ height: "500px" }}></div>
      </div>
    </div>
  );
};

export default LandingPage;
const BoxStyle = styled.div`
  width: 40%,
  height: 200px,
  fontSize: 30px,
  lineHeight: 200px,
  color: white,
  textAlign: center,
`;
