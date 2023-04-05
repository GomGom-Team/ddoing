import React from "react";
import tw, { css, styled, theme } from "twin.macro";

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// 타입스크립트를 사용하기 때문에 onClick 이벤트를 props로 받아준다.
// className을 받아줄 수 도 있다. 그리고 부모 컴포넌트에서 설정해 줘도 된다.
function NextArrow2({ onClick }: NextArrowProps) {
  return <ArrowButton onClick={onClick}>❯</ArrowButton>;
}

export default NextArrow2;

// style
const ArrowButton = styled.button`
  z-index: 5;
  color: black;
  font-size: 40px;
  line-height: 0;
  position: flex;
  top: 50%;
  width: 4rem;
  height: 4rem;
  padding: 0;
  transform: translate(0, -50%);
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  transition: 200ms ease-in-out;
  margin-top: 3rem;
  &:before {
    line-height: 1;
    opacity: 0.75;
    -webkit-font-smoothing: antialiased;
  }
`;
