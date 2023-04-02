import React, { useRef, useState, useCallback, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import axios from "axios";

interface Coordinate {
  x: number;
  y: number;
};

interface predictListType {
  stage: number
  image : string
  results : object
}

interface wordListType {
  id : number
  word: string
  mean: string
  engSentence: string
  koSentence: string
}

interface CanvasPropsType {
  canvasRef: React.RefObject<HTMLCanvasElement>
  predictList: predictListType
  setPredictList: React.Dispatch<React.SetStateAction<predictListType>>
  index: number
  modalHandleOpen(): void
  predict: string
}

const DrawingCanvas = ({canvasRef, predict, predictList, setPredictList, index, modalHandleOpen} : CanvasPropsType) => {
  // state
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
  const [isPainting, setIsPainting] = useState(false);


  // Logic
  // 좌표 얻는 함수
  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    };
  };
  // canvas에 선을 긋는 함수
  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      context.strokeStyle = "black";  // 선 색깔
      context.lineJoin = 'round';	// 선 끄트머리(?)
      context.lineWidth = 5;		// 선 굵기

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();   // drag 방지
      event.stopPropagation();  // drag 방지

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
        console.log("sdd",mousePosition)
      }
    },
    [isPainting, mousePosition]
    
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    // API 요청 보낼 코드
    getPrediction()
  }, []);
  // EventListner 등록
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    return () => {
      // Unmount 시 이벤트 리스터 제거
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [startPaint, paint, exitPaint]);
  // Canvas 지우기
  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
  }

  const getPrediction = () => {
    if (!canvasRef.current) {
      return;
    } else {
      const canvas: HTMLCanvasElement = canvasRef.current;
      // const context = canvas.getContext('2d');
      // const canvasImg = context?.getImageData(0,0,1000,600)
      const formData = new FormData()

      const getBase64StringFromDataURL = (dataURL:string) =>
      dataURL.replace('data:', '').replace(/^.+,/, '');

      const dataUrl = canvas.toDataURL();
      const base64 = getBase64StringFromDataURL(dataUrl)

      formData.append('file', base64)
 
      // axios test
      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          charset: 'utf-8'
        },
       }
      axios.post(`https://j8a103.p.ssafy.io/ai/inference?stage=${1}`, formData, config)
      .then(res => {
        console.log(res.data)
        setPredictList(res.data)
      })
      .catch(err => console.log("먀노ㅓ야ㅓㅁ냐어ㅑ", err)); 
      }
  }

  // useEffect(() => {
  //   const ctx = canvasRef.current?.getContext("2d");
  
  //   const handleResize = () => {
  //     if (ctx) {
  //       ctx.canvas.height = window.innerHeight * 0.765;
  //       ctx.canvas.width = window.innerWidth - 200;
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const canvasHeight = window.innerHeight - 249
  const canvasWidth = window.innerWidth - 500


  return (
    
    <FixedDiv>
      <StyledDiv>
        {/* <AutorenewIcon onClick={()=>clearCanvas()}/> */}
        <StyledCanvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="canvas"/>
        <FlexDiv>
          <StyledButton onClick={()=>clearCanvas()}>
            <img 
              src="assets/icons/eraser.png" 
              height="36"
              width="36"
            />
          </StyledButton>
          <StyledButton onClick={()=>modalHandleOpen()}>
            <SkipButtonDiv>
              <StyledText>
                {`>>`}
              </StyledText>
            </SkipButtonDiv>
            </StyledButton>
        </FlexDiv>
      </StyledDiv>
      <PredictDiv>
        {predict === "..." &&
          <p>...</p>
        }
        {predict === "잘 모르겠어요 ㅠ ㅠ" &&
          <p>잘 모르겠어요 ㅠ ㅠ</p>
        }
        {predict !== "..." && predict !== "잘 모르겠어요 ㅠ ㅠ" &&
          <p>음.. {predict}인가요??</p>
        }
      </PredictDiv>
    </FixedDiv> 
  );

};

export default DrawingCanvas;

const StyledCanvas = styled.canvas(
  tw`rounded-2xl bg-stone-400 bg-opacity-20`,
)

const FixedDiv = styled.div(
  tw`ml-4`
)

const StyledDiv =  styled.div(
  tw`flex`
)

const StyledButton = styled.button(
  tw`hocus:(scale-105 text-yellowD)`,
)

const PredictDiv = styled.div(
  tw`inline-block mr-5 py-3 px-4 bg-brownD rounded-2xl text-white`
)

const FlexDiv = styled.div(
  tw`flex flex-col`
)

const SkipButtonDiv = styled.div`
  height: 36px;
  width: 36px;
`

const StyledText = styled.h1(
  tw`font-bold`,
  css`
    font-family: "insungitCutelivelyjisu";
    font-size: 24px;
  `
)
