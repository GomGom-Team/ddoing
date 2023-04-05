import React, { useRef, useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { Header } from "../components/common/index";
import {
  DrawingDrawer,
  DrawingCanvas,
  ResultModal,
  DrawingLanding,
} from "../components/drawing/index";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import { getWordListAction } from "../redux/modules/drawing";
import useDidMountEffect from "../components/common/useDidMountEffect";
import axios from "axios";

type Anchor = "top";
interface wordListType {
  id: number;
  word: string;
  mean: string;
  engSentence: string;
  koSentence: string;
  picturePath: string;
}

interface radiusType {
  radius: number;
}

const DrawingPage = () => {
  // 유저 정보
  const user = useAppSelector((state) => state.user.userData);
  // Data
  // 단어 목록
  // 스테이지 index
  const maxStage: number = 6;

  // dispatch
  const dispatch = useAppDispatch();

  // landing
  const [landing, setLanding] = useState(true);

  const landingHandler = () => {
    setLanding(false);
  };

  // Timer
  const [timer, setTimer] = useState(60);
  const id = useRef(0);

  const clear = () => {
    window.clearInterval(id.current);
  };

  const countDown = () => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  };

  const mapNumber = (
    number: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ) => {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  useDidMountEffect(() => {
    if (timer <= 0) {
      setTimeout(() => setTimer(60), 1000);
      modalHandleOpen();
    }
  }, [timer]);

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  function describeArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  }

  const SVGCircle = ({ radius }: radiusType) => (
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
    clear();
  };
  const modalHandleClose = () => setmodalOpen(false);


  useDidMountEffect(() => {
    if(modalOpen === false) {
      setTimeout(() => stageHandler(), 500)      
    }
  }, [modalOpen])

  // Answer
  const [answer, setAnswer] = useState(false);

  const answerResetHandler = () => {
    setAnswer(false);
  };

  const answerHandler = () => {
    setAnswer(true);
  };

  useDidMountEffect(() => {
    if (answer === true) {
      setAnswerCount(answerCount + 1);
    }
  }, [answer]);

  // WordList
  const [wordList, setWordList] = useState<wordListType[]>([]);

  const wordListHandler = () => {
    dispatch(getWordListAction()).then((res: any) => {
      setWordList(res.payload);
    });
  };

  useEffect(() => {
    wordListHandler();
    console.log(Object.keys(predictList.results));
  }, []);

  // isDone
  const [isDone, setIsDone] = useState(false);

  const isDoneHandler = () => {
    if (isDone === false) {
      setIsDone(true);
      console.log("게임 끝");
    } else {
      setIsDone(false);
      console.log("게임 초기화");
    }
  };

  useDidMountEffect(() => {
    // if (isDone === true) {
    //   drawerHandler()
    // }
    // isDone이 바뀌는 시간이 0.5초 걸려서 조건문 사용 실패
    drawerHandler();
  }, [isDone]);

  // state
  const [state, setState] = useState({
    top: false,
  });

  const drawerHandler = () => {
    if (state.top === false) {
      setState({ top: true });
    } else {
      setState({ top: false });
    }
  };

  useDidMountEffect(() => {
    if (state.top === true) {
      setTimeout(() => landingHandler(), 500);
      clearCanvas();
      clear();
      setTimeout(() => setTimer(60), 500);
    } else {
      countDown();
    }
  }, [state]);

  // index
  const [index, setIndex] = useState(0);

  const stageHandler = () => {
    if (index < 5) {
      //이얍
      setIndex((index) => index + 1);
      setTimeout(() => console.log("몇스테이지?", index), 1000);
    } else {
      setIsDone(true);
    }
  };
  // 재시작 하는 코드
  const restartHandler = () => {
    setIndex(0);
    clear();
    setAnswerCount(0);
  };

  useDidMountEffect(() => {
    if (index > 0) {
      drawerHandler();
    } else {
      // 재시작시 새로 요청
      setTimeout(() => wordListHandler());
      clear();
      drawerHandler();
      setTimeout(() => isDoneHandler(), 500);
      // // API wordlis 새로 요청
      // setTimeout(() => drawerHandler(), 500);
    }
    answerResetHandler();
  }, [index]);

  // Prediction
  interface predictListType {
    stage: number;
    image: string;
    results: object;
  }
  const [predictList, setPredictList] = useState<predictListType>({
    stage: 1,
    image: "initial value",
    results: { apple: 85.6, grape: 11.2, strawberry: 5.4 },
  });

  const answerList = [
    false,
    false,
    false,
    false,
    false,
    false,
  ]

  const [predictScore, setPredictScore] = useState(0)

  useDidMountEffect(() => {
    const Array = Object.entries(predictList.results);

    Array.forEach((item) => {
      if (item[0] === wordList[index].word && index === predictList.stage) {
        if (!modalOpen) {
          answerHandler();
          // 정답 맞추면 무조건 이미지 저장하는 요청 보내게 [이미지 / 클래스id / 인식정확도 / 유저아이디]
          modalHandleOpen();
          saveFile(item[1])
        }
      }
    });
    returnPrediction(Array);
  }, [predictList]);

  const [predict, setPredict] = useState("...");

  const returnPrediction = (Array: [string, any][]) => {
    setPredict(`${Array[0][0]} 또는 ${Array[1][0]} 또는 ${Array[2][0]} `);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // canvas 지우기
  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext("2d")!!.clearRect(0, 0, canvas.width, canvas.height);
  };

  // 이미지 저장 로직 코드
  const dataURLtoFileObject = (dataURL: string, fileName: string) => {
    let arr = dataURL.split(",");
    let mime = "image/png";
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const saveFile = (score : number) => {
    if (!canvasRef.current) {
      return;
    } else {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const formData = new FormData();
      const dataUrl = canvas.toDataURL();

      //need to update
      let word_class = wordList[index].word;

      const data = {
        userId: user.id,
        wordId: wordList[index].id,
        percentage: score * 100,
      };

      const imgFile = dataURLtoFileObject(
        dataUrl,
        id + "_" + word_class + ".png"
      );
      // console.log(typeof imgFile, imgFile);
      formData.append("file", imgFile);
      formData.append(
        "dto",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      // axios test
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          charset: "utf-8",
        },
      };
      axios
        .post(
          "https://j8a103.p.ssafy.io/api/drawing/file/upload",
          formData,
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log("이미지 업로드 에러", err));
    }
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      console.log("toggle");
      modalHandleClose();
      const val = { [anchor]: open };
      console.log(val);
      setState(val);
    };

  // 경험치 올리기
  // axios intercepter 만들기
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log("경험치 요청");
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  axiosInstance.interceptors.response.use(
    (config) => {
      console.log("경험치 반영 완료");
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // 경험치 요청 보내는 axios 요청 함수
  const levelUP = () => {
    const payload = {
      userId: user.id,
      score: answerCount,
    };

    axiosInstance
      .post("https://j8a103.p.ssafy.io/api/drawing/score", payload)
      .then((res) => {
        console.log("경험치 요청 성공 후 데이터", res.data);
      })
      .catch((err) => console.log("경험치 에러", err));
  };

  const [answerCount, setAnswerCount] = useState(0);

  useDidMountEffect(() => {
    if (isDone) {
      console.log("내가 문제 맞춘 갯수", answerCount);
      levelUP();
    }
  }, [isDone]);

  if (!landing) {
    return (
      <BackgroundDiv>
        <Header />
        <DummyDiv></DummyDiv>
        <CountDownWrapper>
          <CountDownItem>
            <SVGCircle radius={secondsRadius} />
            <CountDownSpan>{timer}</CountDownSpan>
            <TimerWordSpan>seconds</TimerWordSpan>
          </CountDownItem>
        </CountDownWrapper>

        <TimerWrapper>{wordList[index].word}</TimerWrapper>
        <StyledDiv>
          <DrawingCanvas
            predictList={predictList}
            setPredictList={setPredictList}
            wordList={wordList}
            canvasRef={canvasRef}
            index={index}
            modalHandleOpen={modalHandleOpen}
            predict={predict}
            setPredict={setPredict}
          />
        </StyledDiv>
        {/* Drawer */}
        <DrawingDrawer
          toggleDrawer={toggleDrawer}
          state={{ ...state }}
          anchor={"top"}
          wordList={wordList}
          index={index}
          maxStage={maxStage}
          isDone={isDone}
          restartHandler={restartHandler}
        />
        {/* Modal */}
        <ResultModal
          modalHandleOpen={modalHandleOpen}
          modalHandleClose={modalHandleClose}
          answer={answer}
          modalOpen={modalOpen}
          wordList={wordList}
          index={index}
          stageHandler={stageHandler}
          anchor={"top"}
          drawerHandler={drawerHandler}
        />
      </BackgroundDiv>
    );
  }
  return (
    <div>
      <Header />
      <DrawingLanding
        landingHandler={landingHandler}
        toggleDrawer={toggleDrawer}
        anchor={"top"}
      />
      <DrawingDrawer
        toggleDrawer={toggleDrawer}
        state={{ ...state }}
        anchor={"top"}
        wordList={wordList}
        index={index}
        maxStage={maxStage}
        isDone={isDone}
        restartHandler={restartHandler}
      />
    </div>
  );
};

export default DrawingPage;

const StyledDiv = styled.div(tw`flex justify-center text-center`);

const DummyDiv = styled.div(tw`h-16`);

const BackgroundDiv = styled.div`
  background-image: url("assets/img/background.jpg");
  /* background-image:${new URL("../assets/img/background.jpg", import.meta.url)
    .href}; */
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 100%;
  background-position: center;
`;

const TimerWrapper = styled.div(
  tw`flex items-center justify-center text-3xl`,
  css`
    font-family: "insungitCutelivelyjisu";
  `
);

const CountDownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

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
`;

const CountDownSpan = styled.span`
  color: #333;
  font-family: "insungitCutelivelyjisu";
  font-size: 24px;
  font-weight: 600;
`;

const TimerWordSpan = styled.span`
  color: #333;
  font-family: "insungitCutelivelyjisu";
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
`;

const CountDownSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
`;
