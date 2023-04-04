import React, { useRef, useState, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Header } from '../components/common/index'
import { DrawingDrawer, DrawingCanvas, ResultModal, DrawingLanding } from '../components/drawing/index';
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import { getWordListAction } from "../redux/modules/drawing";
import useDidMountEffect from '../components/common/useDidMountEffect';
import axios from 'axios';

type Anchor = "top";

interface wordListType {
  id : number
  word: string
  mean: string
  engSentence: string
  koSentence: string
}

interface radiusType {
  radius : number
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
  const [timer, setTimer] = useState(60);
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

  const mapNumber = (number: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  useDidMountEffect(()=>{
    if(timer <= 0){
      setTimeout(() => setTimer(60), 1000);
      modalHandleOpen()
    }
  },[timer])

  const polarToCartesian = ( centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
  }

  const SVGCircle = ({ radius } : radiusType) => (
    <CountDownSVG>
        <path
            fill="none"
            stroke="#333"
            strokeWidth={4}
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </CountDownSVG>
  );
  
  const secondsRadius = mapNumber(timer, 60, 0, 0, 360);

  // Modal
  const [modalOpen, setmodalOpen] = useState(false);

  const modalHandleOpen = () => {
    setmodalOpen(true);
    // 모달이 열렸을때 타이머 멈추기 
    clear()
  }
  const modalHandleClose = () => setmodalOpen(false);


  // Answer
  const [answer, setAnswer] = useState(true);

  const answerResetHandler = () => {
    setAnswer(false)
  }

  const answerHandler = () => {
    setAnswer(true)
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
    console.log(Object.keys(predictList.results))
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
      setTimeout(() => setTimer(60), 500);
    } else {
      countDown();
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
  // 재시작 하는 코드
  const restartHandler = () => {
    setIndex(0)
    clear()
  }

  useDidMountEffect(() => {
    if (index > 0) {
      drawerHandler()
    }
    else {
      // 재시작시 새로 요청
      setTimeout(() => wordListHandler());
      clear()
      drawerHandler()
      setTimeout(() => isDoneHandler(), 500);
      // // API wordlis 새로 요청
      // setTimeout(() => drawerHandler(), 500);
    }
    answerResetHandler()
  }, [index])
  

  // Prediction
  interface predictListType {
    stage: number
    image : string
    results : object
  }
  const [predictList, setPredictList] = useState<predictListType>({
    stage: 1,
    image : "initial value",
    results : {"apple" : 85.6,
              "grape" : 11.2,
              "strawberry" : 5.4},
  })

  useDidMountEffect(() => {
    const Array = Object.keys(predictList.results)
    Array.forEach(item => {
      if (item === wordList[index].word){
        answerHandler()
        // 정답 맞추면 무조건 이미지 저장하는 요청 보내게 [이미지 / 클래스id / 인식정확도 / 유저아이디]       
      }
    })
    returnPrediction(Array)
  }, [predictList])

  const [predict, setPredict] = useState("...")
  
  const returnPrediction = (Array : string[]) => {
    if ("pending") {
      setPredict("...")
    } else {
    } 
    setPredict(Array[0])
    setTimeout(() => setPredict(Array[1]), 1000)
    setTimeout(() => setPredict(Array[2]), 2000)
    setTimeout(() => setPredict("잘 모르겠어요 ㅠ ㅠ"), 3000)
  }
  


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
        <CountDownWrapper>
          <CountDownItem>
              <SVGCircle radius={secondsRadius} />
              <CountDownSpan>{timer}</CountDownSpan>
              <TimerWordSpan>seconds</TimerWordSpan>
          </CountDownItem>
        </CountDownWrapper>

        <TimerWrapper>
          { wordList[index].word }
        </TimerWrapper>
        <StyledDiv>
          <DrawingCanvas 
            predictList={predictList} 
            setPredictList={setPredictList}
            wordList={wordList}
            canvasRef={canvasRef}
            index={index}
            modalHandleOpen = {modalHandleOpen}
            predict = {predict}
          />
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
  tw`flex items-center justify-center text-3xl`,
  css`
    font-family: "insungitCutelivelyjisu";
  `
)

const CountDownWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`

const CountDownItem = styled.div`
  color: #111;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 30px;
  padding-top: 10px;
  position: relative;
  width: 100px;
  height: 100px;
`

const CountDownSpan = styled.span`  
  color: #333;
  font-family: "insungitCutelivelyjisu";
  font-size: 24px;
  font-weight: 600;
`

const TimerWordSpan = styled.span`
  color: #333;
  font-family: "insungitCutelivelyjisu";
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
`

const CountDownSVG = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
`