import React, { useRef, useState, useCallback, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Header, Button } from '../components/common/index'
import { DrawingDrawer, DrawingCanvas, ResultModal, DrawingLanding } from '../components/drawing/index';

type Anchor = "top";

const DrawingPage = () => {
  // state
  const [landing, setLanding] = useState(true)
  const [modalOpen, setmodalOpen] = useState(false);
  const [answer, setAnswer] = useState(true);
  const [state, setState] = useState({
    top: false,
  });

  // logic
  const landingHandler = () => {
    setLanding(false)
  };
  
  const modalHandleOpen = () => setmodalOpen(true);
  const modalHandleClose = () => setmodalOpen(false);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    console.log('toggle')
    setState({ ...state, [anchor]: open });
  };

  if (!landing) {
    return (
      <BackgroundDiv>
        <Header/>
        <DummyDiv></DummyDiv> 
        <StyledDiv>
          <DrawingCanvas/>
        </StyledDiv>
        {/* Drawer */}
        <DrawingDrawer
          toggleDrawer = {toggleDrawer}
          state = {{...state}}
          anchor = {"top"}
        />
        {/* Modal */}
        <ResultModal 
          modalHandleOpen = {modalHandleOpen}
          modalHandleClose = {modalHandleClose} 
          answer={answer}
          modalOpen = {modalOpen}
        />
      </BackgroundDiv>
    );
  }
  return (
    <div>
      <Header/> 
      <DrawingLanding 
        landingHandler={landingHandler}
        toggleDrawer = {toggleDrawer}
        anchor = {"top"}
      />
      <DrawingDrawer
        toggleDrawer = {toggleDrawer}
        state = {{...state}}
        anchor = {"top"}
      />
    </div>
  )
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