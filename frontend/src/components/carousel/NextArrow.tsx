import React from "react";
import tw, { css, styled, theme } from "twin.macro";


interface NextArrowProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// 타입스크립트를 사용하기 때문에 onClick 이벤트를 props로 받아준다.
// className을 받아줄 수 도 있다. 그리고 부모 컴포넌트에서 설정해 줘도 된다.
function NextArrow({ onClick }: NextArrowProps) {
  return <ArrowButton onClick={onClick}>❯</ArrowButton>;
}

export default NextArrow

// style

const ArrowButton = styled.button`
  z-index: 999;
  right: 20px;
  color:black;
  font-size: 20px;
  line-height: 0;
  position: absolute;
  top: 50%;
  display: flex;
  width: 20px;
  height: 20px;
  padding: 0;
  transform: translate(0, -50%);
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  transition: 200ms ease-in-out;
  &:before {
      line-height: 1;
      opacity: 0.75;
      -webkit-font-smoothing: antialiased;
  }
`

