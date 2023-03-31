import React, { useRef, useState, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Header } from '../components/common/index'
import { DrawingDrawer, DrawingCanvas, ResultModal, DrawingLanding } from '../components/drawing/index';
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import { getWordListAction } from "../redux/modules/drawing";
import useDidMountEffect from '../components/common/useDidMountEffect';

type Anchor = "top";

interface wordListType {
  id : number
  word: string
  mean: string
  engSentence: string
  koSentence: string
}

const DrawingPage = () => {
  // Data
  // 단어 목록
  // 스테이지 index
  const maxStage: number = 6

  // dispatch
  const dispatch = useAppDispatch()


  // landing
  const [landing, setLanding] = useState(true)

  const landingHandler = () => {
    setLanding(false)
  };

  // Timer
  const [timer, setTimer] = useState(20);
  const id = useRef(0);

  const clear=()=>{
    window.clearInterval(id.current)
  }

  const countDown = () => {
    id.current=window.setInterval(()=>{
      setTimer((time)=>time-1)
    },1000)
    return ()=>clear();
  }



  useDidMountEffect(()=>{
    if(timer <= 0){
      setTimeout(() => setTimer(20), 1000);
      modalHandleOpen()
    }
  },[timer])


  // Modal
  const [modalOpen, setmodalOpen] = useState(false);

  const modalHandleOpen = () => {
    setmodalOpen(true);
    // 모달이 열렸을때 타이머 멈추기 
    clear()
  }
  const modalHandleClose = () => setmodalOpen(false);


  // Answer
  const [answer, setAnswer] = useState(false);

  const answerHandler = () => {
    setAnswer(false)
  }

  // WordList
  const [wordList, setWordList] = useState<wordListType[]>([])

  const wordListHandler = () => {
    // const words = useAppSelector((state) => 
    // state.drawing.getWordList.data
    dispatch(getWordListAction()).then((res:any)=>{
      // console.log(res.payload)
      setWordList(res.payload)
    })
  }

  useEffect(() => {
    wordListHandler()
  }, [])


  // isDone
  const [isDone, setIsDone] = useState(false);

  const isDoneHandler = () => {
    if (isDone === false) {
      setIsDone(true)
      console.log("게임 끝")
    } else {
      setIsDone(false)
      console.log("게임 초기화")
    }
  }

  useDidMountEffect(() => {
    // if (isDone === true) {
    //   drawerHandler()
    // }
    // isDone이 바뀌는 시간이 0.5초 걸려서 조건문 사용 실패
    drawerHandler()
  },[isDone])

  // state
  const [state, setState] = useState({
    top: false,
  });

  const drawerHandler = () => {
    if (state.top === false) {
      setState({"top": true});
    } else {
      setState({"top": false})
    }
  }

  useDidMountEffect(() => {
    if (state.top === true) {
      setTimeout(() => landingHandler(), 500);
      clearCanvas()
      clear()
      setTimeout(() => setTimer(20), 500);
    } else {
      setTimeout(() => countDown(), 500);
    }
  }, [state]);


  // index
  const [index, setIndex] = useState(0)

  const stageHandler = () => {
    if (index < 5) {
      setIndex(index + 1)
      setTimeout(() => console.log("몇스테이지?",index), 1000);
    }
    else{
      setIsDone(true)
    }
  }

  const restartHandler = () => {
    setIndex(0)
    console.log("하이하이")
  }

  useDidMountEffect(() => {
    if (index > 0) {
      drawerHandler()
    }
    else {
      // 재시작시 새로 요청
      drawerHandler()  
      setTimeout(() => isDoneHandler(), 500);
      // // API wordlis 새로 요청
      setTimeout(() => wordListHandler(), 500);
      setTimeout(() => drawerHandler(), 500);
    }
  }, [index])

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // canvas 지우기
  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
  }



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
    modalHandleClose();
    const val = {[anchor]: open}
    console.log(val)
    setState(val);
  };


  if (!landing) {
    return (
      <BackgroundDiv>
        <Header/>
        <DummyDiv></DummyDiv> 
        <TimerWrapper>
          <Timer>{timer}</Timer>
          <button onClick={countDown}>씨짞</button>
        </TimerWrapper>
        <StyledDiv>
          <DrawingCanvas canvasRef={canvasRef}/>
        </StyledDiv>
        {/* Drawer */}
        <DrawingDrawer
          toggleDrawer = {toggleDrawer}
          state = {{...state}}
          anchor = {"top"}
          wordList = {wordList}
          index = {index}
          maxStage = {maxStage}
          isDone ={isDone}
          restartHandler={restartHandler}
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
          anchor = {"top"}
          drawerHandler = {drawerHandler}
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
        isDone = {isDone}
        restartHandler={restartHandler}
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
  background-image:url('assets/img/background.jpg');
  /* background-image:${new URL('../assets/img/background.jpg', import.meta.url).href}; */
  background-repeat:no-repeat;
  background-size: 100%;
  width:100%;
  height:100%;
  background-position:center;
  
`

const TimerWrapper = styled.div(
  tw`flex items-center justify-center`
)

const Timer = styled.div(
  tw`rounded border-yellowD border-4 bg-none text-blue-800 text-2xl px-2`
)