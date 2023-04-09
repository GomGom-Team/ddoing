import ReactPlayer from "react-player/youtube";
import tw, { css, styled } from "twin.macro";
import { useNavigate } from "react-router-dom";
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

type InfoProps = {
  myAct: string;
  isVideoStart: boolean;
  videoIdx: number;
};

// 발음평가 점수 평균값 구하기
const getAverage = (numbers: any) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a: number, b: number) => a + b);
  return sum / numbers.length;
};

const PlayerScript = ({ myAct, isVideoStart, videoIdx }: InfoProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // User 정보
  const user = useAppSelector((state) => state.user.userData);
  // Video 정보
  const video = useAppSelector((state) => state.animation.getAnimation);
  // Script 정보
  const script = useAppSelector((state) => state.animation.getScript);

  // React Player 관련
  const playerWrap = React.useRef(null);
  const player = React.useRef<ReactPlayer | null>(null);

  const [playing, setPlaying] = useState(false);
  const [width, setWidth] = useState("44.8vw");
  const [height, setHeight] = useState("25.2vw");
  const [pip, setPip] = useState(false);
  const [volume, setVolumn] = useState(1);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [nowMy, setNowMy] = useState(0);

  // Audio Analyser 관련
  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audioType, setAudioType] = useState("audio/wav");

  // myScore : 현재 발음평가 점수
  const [myScore, setMyScore] = useState(0);
  // isOnResult : 결과를 받았는지(정확히는 받아올 시간을 지났는지)
  const [isOnResult, setIsOnResult] = useState(false);
  // retry : 재시도 해야하는지 여부
  const [retry, setRetry] = useState(false);
  // list : 발음 평가 결과 리스트
  const [list, setList] = useState<number[]>([]);
  // avg : 발음평가 평균값 구하기
  const avg = useMemo(() => getAverage(list), [list]);

  // controlAudio : 현재 녹음 상태 관리
  const controlAudio = (status: any) => {
    setStatus(status);
  };

  // audioProps : 음성 녹음 결과 formData에 넣어서 보내주고, 결과값 받아오기
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
      // 현재 녹음된 결과 파일
      formData.append("multipartFile", e);
      // 발음평가할 Script
      formData.append("script", test[nowMy - 1]?.engSentence);
      // 내 점수 받아오기
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

  // resultSubmit : 결과값(전체 평균점수) 보내주기
  const resultSubmit = () => {
    dispatch(
      recordResultSendAction({
        userId: user.id,
        animationId: videoIdx,
        score: avg,
      })
    );
  };

  // myScore 값이 변경될 때마다, nextList에 해당 값을 계속해서 추가
  useEffect(() => {
    if (myScore !== 0) {
      const nextList = list.concat(myScore);
      setList(nextList);
    }
  }, [myScore]);

  // videoIdx가 변경되면, 맞는 animation과 script를 가져옴
  useEffect(() => {
    if (videoIdx > 0) {
      dispatch(animationGetAction({ userId: user.id, animationId: videoIdx }));
      dispatch(scriptGetAction(videoIdx));
    }
  }, [videoIdx]);

  // test : 내 역할인 대사들만 필터링
  const test = script?.data?.filter((item: any) => {
    return item.role === myAct;
  });

  // 내 역할이 존재하고, 전체 대사 개수보다 현재 대사 index가 적고, playedSeconds가 현재 대사의 endTime과 endTime + 1초 사이일 경우
  if (
    myAct !== "" &&
    test?.length > nowMy &&
    playedSeconds > test[nowMy]?.endTime &&
    playedSeconds < test[nowMy]?.endTime + 1
  ) {
    // nowMy : nowMy + 1의 값으로 업데이트
    setNowMy(nowMy + 1);
    // playing : 재생 -> 정지
    setPlaying(!playing);
  }

  // handleProgress : 현재 영상 상태 관리(재생 여부, Load 여부, 재생 초)
  const handleProgress = (state: any) => {
    setPlayed(state.played);
    setLoaded(state.loaded);
    setPlayedSeconds(state.playedSeconds);
  };

  // status가 변경될 때 실행
  useEffect(() => {
    // 녹음을 마쳤을 때
    if (status === "inactive") {
      // 2.5초 후, isOnResult 값을 true로 변환
      // 음성 평가 결과가 도달하는 시간 고려
      setTimeout(() => {
        setIsOnResult(true);
      }, 2500);
    }
    // 녹음 시작 전이라면
    else if (status === "") {
      // myScore를 0으로 초기화
      setMyScore(0);
      // isOnResult 값을 false로 변환
      setIsOnResult(false);
    }
  }, [status]);

  // isOnResult가 변경될 때 실행
  useEffect(() => {
    // isOnResult가 true인데, myScore가 0이라면
    // 즉, 결과값을 받아오지 못한 경우라면
    if (isOnResult && myScore === 0) {
      // retry 값을 true로 변환
      setRetry(true);
      // isOnResult 값을 false로 변환
      setIsOnResult(false);
    }
  }, [isOnResult]);

  return (
    <AllWrapDiv>
      <PlayerDiv ref={playerWrap}>
        {/* 동영상 재생 관련 */}
        <ReactPlayer
          ref={player}
          width={width}
          height={height}
          url={`https://www.youtube.com/watch?v=${video?.data?.pathUrl}`}
          pip={pip}
          playing={myAct !== "" && loaded === 0 ? true : playing}
          controls={false}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          config={{
            playerVars: {
              start: 0,
              end: video?.data?.runningTime,
            },
          }}
          onPlay={() => {
            setPlaying(true);
          }}
          onPause={() => {
            setPlaying(false);
          }}
        />
      </PlayerDiv>
      {/* 재생이 시작되었고, 멈춤 상태라면 */}
      {loaded > 0 && playing === false && (
        <AllWrapperDiv>
          <HideThingDiv>
            {myAct} : {nowMy} / {test?.length}
          </HideThingDiv>
          {/* 음성 녹음 */}
          <AudioAnalyser
            style={{ position: "absolute", right: "0px" }}
            {...audioProps}
          >
            <RecordStartWrapdiv className="btn-box">
              {/* 음성 녹음 시작 전 상태라면 */}
              {status === "" && (
                <RecordStartAll>
                  <RecordDiv>녹음을 시작해 볼까요?</RecordDiv>
                  <NowScriptDiv>{test[nowMy - 1]?.engSentence}</NowScriptDiv>
                  <RecordStartBtn onClick={() => controlAudio("recording")}>
                    <MicImg src="/assets/img/Mic.png" />
                  </RecordStartBtn>
                </RecordStartAll>
              )}
              {/* 음성 녹음 중이라면 */}
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
          {/* 음성 녹음 멈춤 상태이고, myScore가 정상적인 값 범위에 있으며, 음성 평가 결과를 받아왔다면 */}
          {status === "inactive" && myScore >= 20 && isOnResult && (
            <RecordStartWrapdiv className="btn-box">
              {/* 20 ~ 40점일 경우 */}
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
              {/* 41 ~ 75점일 경우 */}
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
              {/* 76 ~ 100점일 경우 */}
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
          {/* 음성 녹음 멈춤 상태이고, 음성 평가 결과를 받아오지 못했고, retry가 아직 false라면 -> 로딩 icon */}
          {status === "inactive" && isOnResult === false && retry === false && (
            <RecordStartWrapdiv className="btn-box">
              <RecordOnAll>
                <LoadingImg src="/assets/img/Loading.gif" />
              </RecordOnAll>
            </RecordStartWrapdiv>
          )}
          {/* 음성 녹음 멈춤 상태이고, 음성 평가 결과를 받아오지 못해 retry가 true라면 */}
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
      {/* 발음 평가 결과가 내 역할의 대사 개수만큼 있고, 현재 재생 시간이 runningTime을 넘어갔다면 */}
      {list?.length === test?.length &&
        playedSeconds > video?.data?.runningTime && (
          <AllWrapperDiv>
            {/* 평균값 기준 1Star인 경우 */}
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
            {/* 평균값 기준 2Star인 경우 */}
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
            {/* 평균값 기준 3Star인 경우 */}
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
      {/* 스크립트 */}
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
  font-family: "ONE-Mobile-POP";
  font-size: 4vw;
`;

const RecordResDiv = styled.div`
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
  border-radius: 1.5%;
  margin-left: 13vw;
  overflow-y: auto;
  background-color: white;
  z-index: 2;
`;

const RoleDiv = styled.div`
  margin-left: 0.5vw;
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
  width: 30vw;
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
  overflow: hidden;
  top: 0px;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
`;

const RoleImg = styled.img`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 4vw;
  height: 4vw;
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
    width: 4vw;
    height: 4vw;
    display: grid;
    border-radius: 100%;
    overflow: hidden;
  `,
]);

const PlayerDiv = styled.div`
  margin-left: 6.4vw;
  margin-top: 2.8vw;
`;
