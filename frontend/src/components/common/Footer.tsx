import React from "react";
import tw, { css, styled, theme } from "twin.macro";

const Footer = () => {
  return <CustomedFooter>나는 푸터</CustomedFooter>;
};

const CustomedFooter = styled.div(
  tw`bg-gray-200`,
  css`position: relative, transform:translateY(-100%)`
);

export default Footer;
