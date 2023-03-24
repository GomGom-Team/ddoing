import React, { useRef, useState, useCallback, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Button } from '../common/index'

interface CanvasProps {
  width: any;
  height: any;
}
 
interface Coordinate {
  x: number;
  y: number;
};

const DrawingCanvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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


  return (
    <div>
      <StyledCanvas ref={canvasRef} height={700} width={900} className="canvas"/>
      <Button variant = "primary" onClick={()=>clearCanvas()}>CLEAR</Button>
    </div>
  );

};

export default DrawingCanvas;

const StyledCanvas = styled.canvas(
  tw`rounded-2xl bg-stone-400 bg-opacity-20`,
)