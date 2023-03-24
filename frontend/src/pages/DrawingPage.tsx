import React, { useRef, useState, useCallback, useEffect } from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Container, Header, Button } from '../components/common/index'
import { DrawingDrawer } from '../components/drawing/index';
interface CanvasProps {
  width: number;
  height: number;
}
 
interface Coordinate {
  x: number;
  y: number;
};

const DrawingPage = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // state
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
  const [isPainting, setIsPainting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  // 모달
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <Container>
      <Header/>
      <DummyDiv></DummyDiv>
      <StyledDiv>
        <div>
          <StyledCanvas ref={canvasRef} height={height} width={width} className="canvas"/>
        </div>
      </StyledDiv>
      <Button variant = "primary" onClick={()=>clearCanvas()}>CLEAR</Button>
      <Button variant = "primary" onClick={showModal}>모달짱</Button>
      {/* {modalOpen && <ModalBasic setModalOpen={setModalOpen} />} */}
      <DrawingDrawer />
    </Container>
  );
};

DrawingPage.defaultProps = {
  width: 800,
  height: 600,
};

export default DrawingPage;

const StyledDiv = styled.div(
  tw`flex justify-center text-center`,
  css`
    background-image:url('src/assets/img/background.jpg');
    background-repeat:no-repeat;
    background-size: 100%;
    width:100%;
    height:100%;
    background-position:center;
  `
)

const StyledCanvas = styled.canvas(
  tw`rounded-2xl bg-stone-400 bg-opacity-20`,
  css`
    width: 800px;
    height: 600px;
  `
)

const DummyDiv = styled.div(
  tw`h-16`
)