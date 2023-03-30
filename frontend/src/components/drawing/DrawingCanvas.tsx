import React, { useRef, useState, useCallback, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Button } from '../common/index'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import axios from "axios";

interface Coordinate {
  x: number;
  y: number;
};

interface CanvasPropsType {
  canvasRef: React.RefObject<HTMLCanvasElement>
}


const DrawingCanvas = ({canvasRef} : CanvasPropsType) => {
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
  const test = () => {

    if (!canvasRef.current) {
      return;
    } else {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext('2d');
      const canvasImg = context?.getImageData(0,0,1000,600)
      
      // axios test
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
       }
      axios.post('####', canvasImg, config)
      .then(res => {
      console.log(res.data + 'this is data after api call');
      })
      .catch(err => console.log(err)); 
      }
  }


  


  return (
    <FixedDiv>
      <StyledDiv>
        {/* <AutorenewIcon onClick={()=>clearCanvas()}/> */}
        <StyledCanvas ref={canvasRef} width={1000} height={600} className="canvas"/>
        <div>
          <StyledButton onClick={()=>clearCanvas()}><AutorenewIcon/></StyledButton>
          <StyledButton onClick={()=>test()}><AutorenewIcon/></StyledButton>
        </div>
      </StyledDiv>
      <PredictDiv>
        ...
      </PredictDiv>
    </FixedDiv>
  );

};

export default DrawingCanvas;

const StyledCanvas = styled.canvas(
  tw`rounded-2xl bg-stone-400 bg-opacity-20`
)

const FixedDiv = styled.div(
  tw`ml-4`
)

const StyledDiv =  styled.div(
  tw`flex`
)

const StyledButton = styled.button(
  tw`bg-none hocus:(scale-105 text-yellowD)`
)

const PredictDiv = styled.div(
  tw`inline-block mr-5 py-3 px-4 bg-brownD rounded-2xl text-white`
)