import React, { useMemo, useState, useEffect } from "react";
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
  const [width, setWidth] = useState("50vw");
  const [height, setHeight] = useState("28vw");
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

  const controlAudio = (status: any) => {
    setStatus(status);
  };

  const [list, setList] = useState<number[]>([]);
  const avg = useMemo(() => getAverage(list), [list]);

  const audioProps = {
    audioType,
    status,
    audioSrc,
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

  return (
    <AllWrapDiv>
      <div ref={playerWrap}>
        <ReactPlayer
          ref={player}
          className="react-player"
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
      </div>

      {loaded > 0 && playing === false && (
        <AllWrapperDiv>
          <AudioAnalyser {...audioProps}>
            <div className="btn-box">
              <div>{status}</div>
              <button className="btn" onClick={() => controlAudio("recording")}>
                Start
              </button>
              <button className="btn" onClick={() => controlAudio("inactive")}>
                Stop
              </button>
            </div>
          </AudioAnalyser>
          <div>Score is {myScore}</div>
          <div>{test[nowMy - 1]?.engSentence}</div>
          <div>
            <ul>
              {list.map((value: number, index: number) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
            <div></div>
            <button onClick={() => setPlaying(!playing)}>닫기</button>
          </div>
        </AllWrapperDiv>
      )}
      {list?.length === test?.length &&
        playedSeconds > video?.data?.runningTime && (
          <>
            <AllWrapperDiv>
              <b>평균 값:{avg}</b>
              <button
                onClick={() => {
                  navigate(`/videolist`);
                  resultSubmit();
                }}
              >
                닫기
              </button>
            </AllWrapperDiv>
          </>
        )}
      <Container isOverflowed={true}>
        <ScriptAllDiv>
          {script?.data?.map((item: any, index: number) => {
            return (
              <ScriptOl key={index}>
                <StyledLi
                  isMyRole={myAct === item.role}
                  isNowScript={
                    playedSeconds > item.startTime &&
                    playedSeconds < item.endTime + 1
                  }
                >
                  <RoleDiv>{item.role}</RoleDiv>
                  <ScriptWrapDiv>
                    <EngDiv>{item.engSentence}</EngDiv>
                    <KoDiv>{item.koSentence}</KoDiv>
                  </ScriptWrapDiv>
                </StyledLi>
              </ScriptOl>
            );
          })}
        </ScriptAllDiv>
      </Container>
    </AllWrapDiv>
  );
};

export default PlayerScript;

interface LiProps {
  isMyRole?: boolean;
  isNowScript?: boolean;
}

const AllWrapDiv = styled.div`
  display: flex;
`;

const StyledLi = styled.li(({ isMyRole, isNowScript }: LiProps) => [
  isMyRole
    ? css`
        font-weight: 700;
      `
    : css`
        font-weight: 400;
      `,
  isNowScript
    ? css`
        background-color: #ffd0b5;
      `
    : css`
        color: black;
      `,
  css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
]);

const ScriptAllDiv = styled.div`
  display: grid;
  height: 500px;
  width: 30vw;
  margin-left: 5vw;
  overflow-y: scroll;
`;

const RoleDiv = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  width: 5vw;
  text-align: center;
  font-family: "PyeongChangPeace-Light";
`;

const ScriptWrapDiv = styled.div`
  margin: 5px;
  width: 30vw;
  font-family: "CookieRun-Regular";
`;

const EngDiv = styled.div``;

const KoDiv = styled.div``;

const VideoDiv = styled.div`
  display: grid;
`;

const ScriptOl = styled.ol`
  display: flex;
`;

const AllWrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
`;
