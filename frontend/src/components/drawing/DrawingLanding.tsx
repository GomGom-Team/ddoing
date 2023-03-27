import React from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Button } from '../common/index'
interface landingProps {
  landingHandler(): void
  anchor: Anchor
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  // toggleDrawer: (anchor: Anchor, open: boolean)  => void;
}                                                                                                                         

type Anchor = "top";

const DrawingLanding = ( { toggleDrawer, anchor } : landingProps) => {


  return (
    <StyledDiv>
      <StyledBox>
        <FlexDiv>

          <Title>제목</Title>
          <Description>낙서를 통해 배우는 영어!</Description>
          <Button variant='secondary'
            onClick={toggleDrawer(anchor, true)}
          >그림 그리기</Button>
        </FlexDiv>
      </StyledBox>
    </StyledDiv>
  );
};

export default DrawingLanding;

const StyledDiv = styled.div(
  tw`flex items-center justify-center object-center`
)

const StyledBox = styled.div(
  tw`flex`
)

const FlexDiv = styled.div(
  tw`flex justify-center items-center flex-col h-screen`
)

const Title = styled.div(
  tw`text-3xl text-center`
)

const Description = styled.div(
  tw`text-2xl text-center mt-16`
)