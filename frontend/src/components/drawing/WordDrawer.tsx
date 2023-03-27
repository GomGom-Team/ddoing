import React from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Button } from '../common/index'

type Anchor = "top";

type ResultPageProps = {
  anchor: Anchor
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  index: number
  maxStage: number
};

const ResultPage = ({ anchor, toggleDrawer,index, maxStage }: ResultPageProps) => {
  return (
    <StyledDrawer>
      <WordHeader>
        {index} / {maxStage}
      </WordHeader>
      <StyledWrapper>
        <StyledDiv> 
          <DrawerHead> 다음을 그려보세요 </DrawerHead>
            <DrawerBody1>
              <WordDiv>
                <WordEnglish>Apple</WordEnglish>
              </WordDiv>
            </DrawerBody1>

          <DrawerEnd>
            <Button variant='secondary' onClick={toggleDrawer(anchor, false)}>그려볼게요!</Button>
          </DrawerEnd>
        </StyledDiv>
      </StyledWrapper>
    </StyledDrawer>
  );
};

export default ResultPage;

// style

const StyledDrawer = styled.div(
  tw`bg-yellowL`
)

const StyledWrapper = styled.div(
  tw`w-screen h-screen flex justify-center items-center`
)

const WordHeader = styled.div(
  tw`text-lg text-center top-10 text-gray-400`,
  css`
    position: relative;
  `
)

const StyledDiv = styled.div(
  tw`block`,
  css`
    width: 50rem;
    height: 30rem;
  `
)

const DrawerHead = styled.h1(
  tw`flex justify-center mb-32 text-4xl p-5`
)


const DrawerBody1 = styled.div(
  tw`flex justify-evenly my-16`
)

const WordDiv = styled.div(
  tw`flex flex-col items-center justify-center`
)

const WordEnglish = styled.h1(
  tw`text-4xl mb-5`
)

const DrawerEnd = styled.div(
  tw`flex justify-center`
)