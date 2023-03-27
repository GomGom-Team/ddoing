import React, { useRef, useState, useCallback, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Header } from '../components/common/index'
import { DrawingDrawer, DrawingCanvas, ResultModal, DrawingLanding } from '../components/drawing/index';

type Anchor = "top";

interface wordListType {
  wordEng: string
  wordKor: string
  sentenceEng: string
  sentenceKor: string
}

const DrawingPage = () => {
  // Data
  // 단어 목록
  const wordList : wordListType[] = [
    {
      wordEng: "apple",
      wordKor: "사과",
      sentenceEng: "apple is delicious",
      sentenceKor: "사과는 맛있당"
    },
    {
      wordEng: "bear",
      wordKor: "곰돌이",
      sentenceEng: "Cute Bear~",
      sentenceKor: "귀여운 곰돌이~"
    },
    {
      wordEng: "cat",
      wordKor: "야옹이",
      sentenceEng: "The cat is sleeping",
      sentenceKor: "냐옹이가 자고있어요~"
    },
    {
      wordEng: "dog",
      wordKor: "갱얼쥐",
      sentenceEng: "The dog is hungry",
      sentenceKor: "갱얼쥐 배고파"
    },
    {
      wordEng: "english",
      wordKor: "영어",
      sentenceEng: "I hate English",
      sentenceKor: "영어 싫어"
    },
    {
      wordEng: "fire",
      wordKor: "불",
      sentenceEng: "Fire~~~~~~~~",
      sentenceKor: "싹다 불타올라~~~ 야야야"
    },
  ]
  // 스테이지 index
  const maxStage: number = 6

  // state
  const [landing, setLanding] = useState(true)
  const [modalOpen, setmodalOpen] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [state, setState] = useState({
    top: false,
  });
  const [index, setIndex] = useState(0)

  // logic
  const landingHandler = () => {
    setLanding(false)
  };

  const stageHandler = () => {
    if (index < 5) {
      setIndex(index + 1)
      console.log("몇스테이지?",index)
    }
  }

  const answerHandler = () => {
    setAnswer(false)
  }

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

  // useEffect
  useEffect(() => {
    if (state.top === true) {
      setTimeout(() => landingHandler(), 500);
    }
  }, [state]);


  // 렌더링
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
          wordList = {wordList}
          index = {index}
          maxStage = {maxStage}
        />
        {/* Modal */}
        <ResultModal 
          modalHandleOpen = {modalHandleOpen}
          modalHandleClose = {modalHandleClose} 
          answer={answer}
          modalOpen = {modalOpen}
          wordList = {wordList}
          index = {index}
          stageHandler = {stageHandler}
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
        wordList = {wordList}
        index = {index}
        maxStage = {maxStage}
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