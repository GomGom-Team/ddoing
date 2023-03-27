import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useAppDispatch } from "../redux/configStore.hooks";
import { recordSendAction } from "../redux/modules/animation";

interface MySound {
  status: string;
  startRecording: any;
  stopRecording: any;
  mediaBlobUrl: any;
}

function Sound() {
  const dispatch = useAppDispatch();
  const { status, startRecording, stopRecording, mediaBlobUrl }: MySound =
    useReactMediaRecorder({ audio: true });
  const [isClick, setIsClick] = useState(false);
  console.log("What ? " + typeof startRecording);

  const clickMyBtn = () => {
    setIsClick(!isClick);
  };

  function getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  const onSubmitAudioFile = async () => {
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const formData = new FormData();
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioBlob], "soundBlob.wav", {
      lastModified: new Date().getTime(),
      type: "audio/wav",
    });
    formData.append("multipartFile", sound);
    formData.append("script", "");
    // send 함수
    dispatch(recordSendAction(formData));
    for (let key of formData.keys()) {
      console.log(`${key}: ${formData.get(key)}`);
    }
    console.log(sound); // File 정보 출력
    console.log(getBase64(sound));
  };

  return (
    <div>
      <button onClick={startRecording}>녹음 시작하기</button>
      {status === "recording" && (
        <div>
          <p>듣고 있어요</p>
          <button onClick={stopRecording}>녹음 끝내기</button>
        </div>
      )}
      {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
      {/* <a href={mediaBlobUrl} download="my-audio-file.wav">
        Download
      </a>
      <br /> */}
      <button onClick={onSubmitAudioFile}>base64</button>
      {/* <button onClick={}></button> */}
      {/* <button onClick={myClick}>닫기</button> */}
    </div>
  );
}

export default Sound;

// const styledBtn = styled.button((isRecord : ))
