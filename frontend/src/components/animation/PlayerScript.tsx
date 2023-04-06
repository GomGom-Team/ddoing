import { useSelector, useDispatch } from "react-redux";
import { findDOMNode } from "react-dom";
import FilePlayer from "react-player/file";
import ReactPlayer from "react-player/youtube";
import tw, { css, styled, theme } from "twin.macro";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import {
  animationGetAction,
  scriptGetAction,
  recordSendAction,
  recordResultSendAction,
} from "../../redux/modules/animation";
import { getScore } from "../../redux/modules/animation/score";
import AudioAnalyser from "react-audio-analyser";
import Container from "../common/Container";
import React, { useState, useEffect, useMemo } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Loading from "../common/Loading";

type InfoProps = {
  myAct: string;
  isVideoStart: boolean;
  videoIdx: number;
};

const getAverage = (numbers: any) => {
  console.log("numbers is ", numbers);
  console.log("평균값 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a: number, b: number) => a + b);
  return sum / numbers.length;
};

const PlayerScript = ({ myAct, isVideoStart, videoIdx }: InfoProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const player = React.useRef<ReactPlayer | null>(null);
  const user = useAppSelector((state) => state.user.userData);

  const playerWrap = React.useRef(null);

  const [playing, setPlaying] = useState(false);
  const [width, setWidth] = useState("44.8vw");
  const [height, setHeight] = useState("25.2vw");
  const [pip, setPip] = useState(false);
  const [controls, setControls] = useState(true);
  const [volume, setVolumn] = useState(1);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const [urlValue, setUrlvalue] = useState("");

  const [nowMy, setNowMy] = useState(0);

  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audioType, setAudioType] = useState("audio/wav");
  const [myScore, setMyScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isOnResult, setIsOnResult] = useState(false);
  const [retry, setRetry] = useState(false);

  const controlAudio = (status: any) => {
    setStatus(status);
  };

  const controlRecording = () => {
    setIsRecording(!isRecording);
  };

  const [list, setList] = useState<number[]>([]);
  const avg = useMemo(() => getAverage(list), [list]);

  const audioProps = {
    audioType,
    status,
    audioSrc,
    width: 0,
    height: 0,
    className: "MyCanvas",
    timeslice: 1000,
    stopCallback: (e: any) => {
      setAudioSrc(window.URL.createObjectURL(e));
      const formData = new FormData();
      formData.append("multipartFile", e);
      formData.append("script", test[nowMy - 1]?.engSentence);
      console.log("What's now Script ? ", test[nowMy - 1]?.engSentence);
      dispatch(recordSendAction(formData)).then(() =>
        setMyScore(Number(getScore()))
      );
    },
    onRecordCallback: (e: any) => {
      console.log("recording", e);
    },

    errorCallback: (err: any) => {
      console.log("error", err);
    },
  };

  const resultSubmit = () => {
    dispatch(
      recordResultSendAction({
        userId: user.id,
        animationId: videoIdx,
        score: avg,
      })
    );
  };

  useEffect(() => {
    if (myScore !== 0) {
      const nextList = list.concat(myScore);
      setList(nextList);
      console.log("list!!!!!!!", nextList);
    }
  }, [myScore]);

  useEffect(() => {
    if (videoIdx > 0) {
      dispatch(animationGetAction({ userId: user.id, animationId: videoIdx }));
      dispatch(scriptGetAction(videoIdx));
    }
  }, [videoIdx]);
  const script = useAppSelector((state) => state.animation.getScript);
  const video = useAppSelector((state) => state.animation.getAnimation);

  const test = script?.data?.filter((item: any) => {
    return item.role === myAct;
  });
  if (
    myAct !== "" &&
    test?.length > nowMy &&
    playedSeconds > test[nowMy]?.endTime &&
    playedSeconds < test[nowMy]?.endTime + 1
  ) {
    setNowMy(nowMy + 1);
    setPlaying(!playing);
  }
  const handleProgress = (state: any) => {
    setPlayed(state.played);
    setLoaded(state.loaded);
    setPlayedSeconds(state.playedSeconds);
  };

  useEffect(() => {
    if (status === "inactive") {
      setTimeout(() => {
        setIsOnResult(true);
      }, 2500);
    } else if (status === "") {
      setMyScore(0);
      setIsOnResult(false);
    }
  }, [status]);

  useEffect(() => {
    if (isOnResult && myScore === 0) {
      setRetry(true);
      setIsOnResult(false);
    }
  }, [isOnResult]);

  console.log("status", status);
  console.log("isOnResult", isOnResult);
  console.log("retry", retry);

  console.log("script!!!!!!!!!", script);

  return (
    <AllWrapDiv>
      <PlayerDiv ref={playerWrap}>
        <ReactPlayer
          ref={player}
          width={width} // 가로 크기
          height={height} // 세로 크기
          url={`https://www.youtube.com/watch?v=${video?.data?.pathUrl}`} // url
          pip={pip}
          playing={myAct !== "" && loaded === 0 ? true : playing}
          controls={false}
          volume={volume}
          muted={muted}
          onProgress={handleProgress} // 진행중 이벤트, 현재 진행 상황을 알 수 있습니다.
          config={{
            playerVars: {
              start: 0,
              end: video?.data?.runningTime,
            },
          }}
          onPlay={() => {
            setPlaying(true);
          }} // 재생하면 Playing이 true가 되야하니까
          onPause={() => {
            setPlaying(false);
          }} // 정지하면 Playing false
          onEnablePIP={() => {
            setPip(true);
          }} // PIP 모드 실행하면 PIP set ture
          onDisablePIP={() => {
            setPip(false);
          }} // PIP 모드 취소 PIP set ture
        />
      </PlayerDiv>

      {loaded > 0 && playing === false && (
        <AllWrapperDiv>
          <HideThingDiv>
            {myAct} : {nowMy} / {test?.length}
          </HideThingDiv>
          <AudioAnalyser
            style={{ position: "absolute", right: "0px" }}
            {...audioProps}
          >
            <RecordStartWrapdiv className="btn-box">
              {status === "" && (
                <RecordStartAll>
                  <RecordDiv>녹음을 시작해 볼까요?</RecordDiv>
                  <NowScriptDiv>{test[nowMy - 1]?.engSentence}</NowScriptDiv>
                  <RecordStartBtn onClick={() => controlAudio("recording")}>
                    <MicImg src="/assets/img/Mic.png" />
                  </RecordStartBtn>
                </RecordStartAll>
              )}

              {status === "recording" && (
                <RecordStartAll>
                  <RecordDiv>듣고 있어요!</RecordDiv>
                  <NowScriptDiv>{test[nowMy - 1]?.engSentence}</NowScriptDiv>
                  <RecordStopBtn onClick={() => controlAudio("inactive")}>
                    <MicImg src="/assets/img/Mic.gif" />
                  </RecordStopBtn>
                </RecordStartAll>
              )}
            </RecordStartWrapdiv>
          </AudioAnalyser>
          {status === "inactive" && myScore >= 20 && isOnResult && (
            <RecordStartWrapdiv className="btn-box">
              {myScore >= 20 && myScore <= 40 && (
                <RecordOnAll>
                  <RecordResDiv>Good!</RecordResDiv>
                  <ResultImg src="/assets/img/Good.png"></ResultImg>
                  <RecordEndBtn
                    onClick={() => {
                      setPlaying(!playing);
                      controlAudio("");
                    }}
                  >
                    닫기
                  </RecordEndBtn>
                </RecordOnAll>
              )}
              {myScore >= 41 && myScore <= 75 && (
                <RecordOnAll>
                  <RecordResDiv>Great!</RecordResDiv>
                  <ResultImg src="/assets/img/Great.png"></ResultImg>
                  <RecordEndBtn
                    onClick={() => {
                      setPlaying(!playing);
                      controlAudio("");
                    }}
                  >
                    닫기
                  </RecordEndBtn>
                </RecordOnAll>
              )}
              {myScore >= 76 && myScore <= 100 && (
                <RecordOnAll>
                  <RecordResDiv>Excellent!</RecordResDiv>
                  <ResultImg src="/assets/img/Excellent.png"></ResultImg>
                  <RecordEndBtn
                    onClick={() => {
                      setPlaying(!playing);
                      controlAudio("");
                    }}
                  >
                    닫기
                  </RecordEndBtn>
                </RecordOnAll>
              )}
            </RecordStartWrapdiv>
          )}
          {status === "inactive" && isOnResult === false && retry === false && (
            <RecordStartWrapdiv className="btn-box">
              <RecordOnAll>
                <LoadingImg src="/assets/img/Loading.gif" />
              </RecordOnAll>
            </RecordStartWrapdiv>
          )}
          {status === "inactive" && retry && (
            <RecordStartWrapdiv className="btn-box">
              <RecordOnAll>
                <RecordResDiv>앗, 제대로 못들었어요😥</RecordResDiv>
                <RecordEndBtn
                  onClick={() => {
                    setRetry(false);
                    setStatus("");
                  }}
                >
                  다시하기
                </RecordEndBtn>
              </RecordOnAll>
            </RecordStartWrapdiv>
          )}
        </AllWrapperDiv>
      )}
      {list?.length === test?.length &&
        playedSeconds > video?.data?.runningTime && (
          <AllWrapperDiv>
            {avg >= 20 && avg <= 40 && (
              <RecordOnAll>
                <RealEndAll>
                  <RealResDiv>Good Job</RealResDiv>
                  <StarImg src="/assets/img/Star1.gif" />

                  <RealImg src="/assets/img/Good_Finish.png"></RealImg>

                  <RealEndBtn
                    onClick={() => {
                      navigate(`/videolist`);
                      resultSubmit();
                    }}
                  >
                    닫기
                  </RealEndBtn>
                </RealEndAll>
              </RecordOnAll>
            )}
            {avg >= 41 && avg <= 75 && (
              <RecordOnAll>
                <RealEndAll>
                  <RealResDiv>Great Job</RealResDiv>
                  <StarImg src="/assets/img/Star2.gif" />

                  <RealImg src="/assets/img/Great_Finish.png"></RealImg>

                  <RealEndBtn
                    onClick={() => {
                      navigate(`/videolist`);
                      resultSubmit();
                    }}
                  >
                    닫기
                  </RealEndBtn>
                </RealEndAll>
              </RecordOnAll>
            )}
            {avg >= 76 && avg <= 100 && (
              <RecordOnAll>
                <RealEndAll>
                  <RealResDiv>Excellent Job</RealResDiv>
                  <StarImg src="/assets/img/Star3.gif" />
                  <RealImg src="/assets/img/Excellent_Finish.png"></RealImg>

                  <RealEndBtn
                    onClick={() => {
                      navigate(`/videolist`);
                      resultSubmit();
                    }}
                  >
                    닫기
                  </RealEndBtn>
                </RealEndAll>
              </RecordOnAll>
            )}
          </AllWrapperDiv>
        )}
      <ClipboardImg src="/assets/img/Clipboard.png" />
      <ScriptAllDiv>
        <Container isOverflowed={true}>
          {script?.data?.map((item: any, index: number) => {
            return (
              <ScriptDiv key={index}>
                {item.engSentence === "a" ? (
                  <PrepareDiv>
                    스크립트
                    <br />
                    준비중입니다.
                  </PrepareDiv>
                ) : (
                  <StyledDiv
                    isMyRole={myAct === item.role}
                    isNowScript={
                      playedSeconds > item.startTime &&
                      playedSeconds < item.endTime + 1
                    }
                  >
                    <RoleDiv>
                      <RoleNowDiv isMyRole={myAct === item.role}>
                        <RoleImg src={`/assets/img/${item.role}.png`} />
                      </RoleNowDiv>
                    </RoleDiv>
                    <ScriptWrapDiv>
                      <EngDiv>{item.engSentence}</EngDiv>
                      <KoDiv>{item.koSentence}</KoDiv>
                    </ScriptWrapDiv>
                  </StyledDiv>
                )}
              </ScriptDiv>
            );
          })}
        </Container>
      </ScriptAllDiv>
    </AllWrapDiv>
  );
};

export default PlayerScript;

interface LiProps {
  isMyRole?: boolean;
  isNowScript?: boolean;
}

interface MyProps {
  isMyRole?: boolean;
}

const MyCanvas = styled.div`
  width: 0px;
  height: 0px;
  visibility: hidden;
`;
const ClipboardImg = styled.img`
  display: flex;
  position: absolute;
  width: 34.5vw;
  right: 3vw;
  top: 5.2vw;
`;

const PrepareDiv = styled.div`
  display: flex;
  position: absolute;
  width: 30vw;
  height: 68vh;
  top: 22.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 3vw;
  font-family: "PyeongChangPeace-Bold";
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
`;
const LoadingImg = styled.img`
  position: absolute;
  width: 10vw;
  left: 43.5vw;
  top: 20vw;
  z-index: 999;
`;

const StarImg = styled.img`
  position: absolute;
  width: 15vw;
  left: 42.5vw;
  top: 17vw;
  z-index: 999;
`;

const HideThingDiv = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20vw;
  padding: 5px;
  font-family: "PyeongChangPeace-Bold";
  font-size: 2vw;
  z-index: 999;
  text-align: center;
  color: Black;
  background-color: #fbf8cc;
`;
const ResultImg = styled.img(
  tw`
  animate-bounce
  `,
  css`
    position: absolute;
    width: 10vw;
    left: 45vw;
    top: 22.5vw;
  `
);

const RealImg = styled.img(
  tw`
  animate-bounce
  `,
  css`
    position: absolute;
    width: 10vw;
    left: 45vw;
    top: 25vw;
  `
);

const RecordStartWrapdiv = styled.div`
  /* margin-top: 20vh; */
  display: grid;
`;

const MicImg = styled.img`
  width: 7.5vw;
`;

const RecordEndBtn = styled.button`
  width: 10vw;
  position: absolute;
  top: 30vw;
  left: 45vw;
  text-align: center;
  font-family: "PyeongChangPeace-Light";
  font-size: 2vw;
  color: black;
  background-color: white;
  border-radius: 1vw;
`;

const RealEndBtn = styled.button`
  width: 10vw;
  position: absolute;
  top: 35vw;
  left: 45vw;
  text-align: center;
  font-family: "PyeongChangPeace-Light";
  font-size: 2vw;
  color: black;
  background-color: white;
  border-radius: 1vw;
  border: 3px solid;
  border-color: #969696;
`;

const RecordDiv = styled.div`
  margin-top: 10vw;
  /* position: absolute; */
  /* top: 10vw; */
  /* margin-bottom: 30vw; */
  font-family: "ONE-Mobile-POP";
  font-size: 4vw;
`;

const RecordResDiv = styled.div`
  /* position: absolute; */
  /* top: 0px; */
  /* left: 44vw; */
  /* margin-top: 10vw; */
  /* margin-bottom: 10vh; */
  margin-top: 10vw;
  font-family: "ONE-Mobile-POP";
  font-size: 4vw;
`;

const RealResDiv = styled.div`
  margin-bottom: 40vh;
  font-family: "ONE-Mobile-POP";
  font-size: 4vw;
  color: black;
`;

const NowScriptDiv = styled.div`
  margin-bottom: 25vw;
  width: 65vw;
  font-family: "PyeongChangPeace-Light";
  font-size: 3vw;
`;

const RecordStartBtn = styled.button`
  /* background-color: #fff125; */
  margin-top: 5vw;
  width: 7.5vw;
  height: 7.5vw;
  border-radius: 100%;
  left: 45vw;
  top: 22.5vw;
  position: absolute;
  align-items: center;
  justify-content: center;
  border-color: white;
  border: 2px solid;
`;

const RecordStopBtn = styled.button`
  margin-top: 5vw;
  width: 7.5vw;
  height: 7.5vw;
  border-radius: 100%;
  left: 45vw;
  top: 22.5vw;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const RecordStartAll = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

const RecordOnAll = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh - 54px;
`;

const RealEndAll = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 15vh;
  height: 70vh;
  width: 30vw;
  background-color: #fbf8cc;
`;

const AllWrapDiv = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding-top: 10vw;
`;

const StyledDiv = styled.div(({ isMyRole, isNowScript }: LiProps) => [
  isMyRole
    ? css`
        font-weight: 700;
      `
    : css`
        font-weight: 400;
      `,
  isNowScript
    ? css`
        background-color: #fdf579;
      `
    : css`
        color: black;
      `,
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 31vw;
    box-shadow: 2px 4px 4px hsl(0deg 0% 0% / 0.25);
  `,
]);

const ScriptAllDiv = styled.div`
  display: grid;
  height: 35.3vw;
  width: 31vw;
  margin-top: 1.3vw;
  /* border: 1px solid; */
  /* padding: 1vw; */
  border-radius: 1.5%;
  margin-left: 13vw;
  overflow-y: auto;
  background-color: white;
  z-index: 2;
`;

const RoleDiv = styled.div`
  margin-left: 0.5vw;
  /* margin-right: 0.5vw; */
  width: 5vw;
  text-align: center;
  font-family: "PyeongChangPeace-Light";
`;

const ScriptWrapDiv = styled.div`
  margin: 0.5vw;
  width: 100%;
  font-size: 1.2vw;
`;

const EngDiv = styled.div`
  font-family: "Pretendard-Medium";
`;

const KoDiv = styled.div`
  color: rgb(102, 102, 102);
  font-family: "Pretendard-Light";
`;

const VideoDiv = styled.div`
  display: grid;
`;

const ScriptDiv = styled.ol`
  display: flex;
  /* margin-top: 10px */
  padding: 5px;
  background-color: #ffffff;
  border-radius: 5%;
`;

const AllWrapperDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  align-items: center;
  justify-content: center;
  /* text-align: center; */
  top: 0px;
  /* position: absolute; */
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
`;

const RoleImg = styled.img`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const RoleNowDiv = styled.div(({ isMyRole }: MyProps) => [
  isMyRole
    ? css`
        border: 3px outset rgba(219, 150, 122, 0.67);
      `
    : css`
        border: 3px outset rgba(156, 122, 219, 0.67);
      `,
  css`
    width: 70px;
    height: 70px;
    display: grid;
    border-radius: 100%;
    overflow: hidden;
  `,
]);

const RoleNameDiv = styled.div`
  justify-content: center;
`;

const PlayerDiv = styled.div`
  margin-left: 6.4vw;
  margin-top: 2.8vw;
`;
