import React, { useState, useEffect, useMemo } from "react";
import tw, { css, styled, theme } from "twin.macro";
import AudioAnalyser from "react-audio-analyser";
import { useAppDispatch } from "../redux/configStore.hooks";
import { recordSendAction } from "../redux/modules/animation";
import { getScore } from "../redux/modules/animation/score";

const getAverage = (numbers: any) => {
  console.log("numbers is ", numbers);
  console.log("평균값 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a: number, b: number) => a + b);
  return sum / numbers.length;
};

const AudioRecorder = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audioType, setAudioType] = useState("audio/wav");
  const [myScore, setMyScore] = useState(0);

  const controlAudio = (status: any) => {
    setStatus(status);
  };

  const [list, setList]: any = useState([]);
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
      formData.append("script", "Have a nice day");
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

  useEffect(() => {
    if (myScore !== 0) {
      const nextList = list.concat(myScore);
      setList(nextList);
    }
  }, [myScore]);

  useEffect(() => {
    if (myScore !== 0) {
      const nextList = list.concat(myScore);
      setList(nextList);
    }
  }, [myScore]);

  return (
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

      <div>
        <ul>
          {list.map((value: number, index: number) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <div>
          <b>평균 값:</b> {avg}
        </div>
        <button>닫기</button>
      </div>
    </AllWrapperDiv>
  );
};

export default AudioRecorder;

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
