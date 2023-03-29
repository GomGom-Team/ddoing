import React, { useState, useEffect, useMemo } from "react";
import AudioAnalyser from "react-audio-analyser";
import { useAppDispatch } from "../redux/configStore.hooks";
import { recordSendAction } from "../redux/modules/animation";
import { getScore } from "../redux/modules/animation/score";
// import AllScore from "./allScore";

type Lists = {
  score: number;
};

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
  // const [list, setList] = useState<Lists[]>([]);
  // const arr = [0];

  const controlAudio = (status: any) => {
    setStatus(status);
  };

  /////////////////////////////////////////////
  // const [inputValue, setInputValue] = useState("");
  // const [todo, setTodo] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const saved = window.localStorage.getItem("todoKey");
  //     if (saved !== null) {
  //       return JSON.parse(saved);
  //     } else {
  //       return [""];
  //     }
  //   }
  // });
  // const [newTodo, setNewTodo] = useState(0);

  // const inputChg = (e) => {
  //   setInputValue(e.target.value);
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setTodo([...todo, newTodo]);
  //   // setInputValue("");
  // };

  // useEffect(() => {
  //   setNewTodo(myScore);
  // }, [myScore]);

  // useEffect(() => {
  //   localStorage.setItem("todoKey", JSON.stringify(todo));
  // }, [todo]);

  // const todosMap = todo.map((item: any, i: number) => <li key={i}>{item}</li>);
  ////////////////////////

  const [list, setList]: any = useState([]);
  // const [number, setNumber] = useState("");

  // const onChange = (e) => {
  //   setNumber(e.target.value);
  // };
  const onInsert = () => {
    if (myScore !== 0) {
      const nextList = list.concat(myScore);
      setList(nextList);
    }
  };

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
      console.log("is in?");
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

  return (
    <div>
      <AudioAnalyser {...audioProps}>
        <div className="btn-box">
          <div>{status}</div>
          <button className="btn" onClick={() => controlAudio("recording")}>
            Start
          </button>
          <button className="btn" onClick={() => controlAudio("inactive")}>
            Stop
          </button>
          <button onClick={onInsert}>끝</button>
        </div>
      </AudioAnalyser>
      <div>Score is {myScore}</div>
      {/* {status === "inactive" && <AllScore nowScore={myScore} />} */}

      {/* <div className="parent">
        name: <div className="todosMap">{todosMap}</div>
        <form onSubmit={onSubmit}>
          <input value={inputValue} onChange={inputChg}></input>
          <button>저장</button>
        </form>
      </div> */}

      <div>
        {/* <input value={number} onChange={onChange} /> */}
        {/* <button onClick={onInsert}>등록</button> */}
        <ul>
          {list.map((value: number, index: number) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <div>
          <b>평균 값:</b> {avg}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
