import tw, { css, styled, theme } from 'twin.macro'

interface ContainerProps {
  isOverflowed? : boolean
}

const Container = styled.div(({ isOverflowed } : ContainerProps) => [
  isOverflowed?
  // if true
  css`
    overflow: auto;
    height: 100%;

  &::-webkit-scrollbar {
     width: 10px;
     height: 10px;
    }
  &::-webkit-scrollbar-thumb {
    background-color: #cfcfcfd6;
    border-radius:10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {  
    background-color: #cfcfcf2b;
    border-radius:10px;
    box-shadow: inset 0px 0px 5px white;
  }
  `:
  // if false
  css`
    height: 100%;
    `
])

export default Container