import React, { useRef, useState, useCallback, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Header, Button } from '../components/common/index'
import { DrawingDrawer, DrawingCanvas, ResultModal } from '../components/drawing/index';

const DrawingPage = () => {


  return (
    <BackgroundDiv>
      <Header/>
      <DummyDiv></DummyDiv> 
      <StyledDiv>
        <DrawingCanvas/>
      </StyledDiv>
      <DrawingDrawer/>
      <ResultModal/>

    </BackgroundDiv>
  );
};


export default DrawingPage;

const StyledDiv = styled.div(
  tw`flex justify-center text-center`,
)

const DummyDiv = styled.div(
  tw`h-16`
)

const BackgroundDiv = styled.div`
  background-image:url('src/assets/img/background.jpg');
  background-repeat:no-repeat;
  background-size: 100%;
  width:100%;
  height:100%;
  background-position:center;
  
`