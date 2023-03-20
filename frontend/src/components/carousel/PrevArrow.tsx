import React from "react";
import tw, { css, styled, theme } from "twin.macro";


interface NextArrowProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// 타입스크립트를 사용하기 때문에 onClick 이벤트를 props로 받아준다.
// className을 받아줄 수 도 있다. 그리고 부모 컴포넌트에서 설정해 줘도 된다.
function PrevArrow({ onClick }: NextArrowProps) {
  return <ArrowButton onClick={onClick}>❮</ArrowButton>;
}

export default PrevArrow

// style

  // tw`!btn-circle !bg-white !text-brownL !border-black !shadow-lg text-center bg-opacity-40
  // backdrop-filter 
  // backdrop-blur-lg`,

const ArrowButton = styled.button`
  z-index: 999;
  left: 20px;
  color:black;
  font-size: 20px;
  line-height: 0;
  position: absolute;
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

  &:before {
      line-height: 1;
      opacity: 0.75;
      -webkit-font-smoothing: antialiased;
  }
`

