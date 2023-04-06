import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import tw, { css, styled, theme } from "twin.macro";

type Anchor = "top";
interface wordListType {
  id: number;
  word: string;
  mean: string;
  engSentence: string;
  koSentence: string;
  picturePath: string;
}
interface modalProps {
  answer: boolean;
  modalOpen: boolean;
  modalHandleOpen(): void;
  modalHandleClose(): void;
  wordList: wordListType[];
  index: number;
  stageHandler(): void;
  anchor: Anchor;
  drawerHandler(): void;
}

export default function TransitionsModal({
  drawerHandler,
  anchor,
  answer,
  modalOpen,
  modalHandleOpen,
  modalHandleClose,
  wordList,
  index,
  stageHandler,
}: modalProps) {
  // const closeModal = async ()=>{
  //   return modalHandleClose();
  // }

  // const nextStage = async ()=>{
  //     await closeModal().then(() => {
  //       stageHandler()
  //     })
  //     // setTimeout(() => stageHandler(), 500);
  // }
  const nextStage = () => {
    modalHandleClose();
  };
  // 정답일 경우 띄울 모달 페이지
  if (answer) {
    return (
      <div>
        {/* <Button onClick={modalHandleOpen}>Open modal</Button> */}
        <Modal
          open={modalOpen}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modalOpen}>
            <Box component="div" sx={style}>
              {/* 결과 화면을 띄워줄 곳 */}
              <StyledDrawer>
                <StyledDiv>
                  <DrawerHead> 정답! </DrawerHead>

                  <DrawerBody1>
                    <WordDiv>
                      <WordEnglish>{wordList[index].word}</WordEnglish>
                      <WordKorean>{wordList[index].mean}</WordKorean>
                    </WordDiv>
                    <ImgWrapper>
                      <CustomedImage
                        src={`https://j8a103.p.ssafy.io/ec2/class_images/${wordList[index].picturePath}`}
                      ></CustomedImage>
                    </ImgWrapper>
                  </DrawerBody1>

                  <DrawerBody2>
                    <ExampleEnglish>
                      {wordList[index].engSentence}
                    </ExampleEnglish>
                    <ExampleKorean>{wordList[index].koSentence}</ExampleKorean>
                  </DrawerBody2>

                  <DrawerEnd>
                    {index < 5 && (
                      <button onClick={nextStage}>다음 문제</button>
                    )}
                    {index === 5 && (
                      <button onClick={nextStage}>결과 보기</button>
                    )}
                  </DrawerEnd>
                </StyledDiv>
              </StyledDrawer>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
  return (
    <div>
      {/* <Button onClick={modalHandleOpen}>Open modal</Button> */}
      <Modal
        open={modalOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box component="div" sx={style}>
            {/* 결과 화면을 띄워줄 곳 */}
            <StyledDrawer>
              <StyledDiv>
                <DrawerHead> 땡! </DrawerHead>

                <DrawerBody1>
                  <WordDiv>
                    <WordEnglish>{wordList[index].word}</WordEnglish>
                    <WordKorean>{wordList[index].mean}</WordKorean>
                  </WordDiv>
                  <ImgWrapper>
                    <CustomedImage
                      src={`https://j8a103.p.ssafy.io/ec2/class_images/${wordList[index].picturePath}`}
                    ></CustomedImage>
                  </ImgWrapper>
                </DrawerBody1>

                <DrawerBody2>
                  <ExampleEnglish>{wordList[index].engSentence}</ExampleEnglish>
                  <ExampleKorean>{wordList[index].koSentence}</ExampleKorean>
                </DrawerBody2>

                <DrawerEnd>
                  {index < 5 && <button onClick={nextStage}>다음 문제</button>}
                  {index === 5 && (
                    <button onClick={nextStage}>결과 보기</button>
                  )}
                </DrawerEnd>
              </StyledDiv>
            </StyledDrawer>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

// style

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#FBF8CC",
  border: "4px solid #9A7946",
  // boxShadow: 24,
  p: 2,
  borderRadius: 10,
};

const StyledDrawer = styled.div(
  tw`flex justify-center items-center`,
  css`
    font-family: "insungitCutelivelyjisu";
    font-size: 24px;
  `
);

const StyledDiv = styled.div(
  tw`border-red-500 rounded`,
  css`
    width: 40rem;
    height: 40rem;
  `
);

const DrawerHead = styled.h1(tw`flex justify-center mb-16 text-7xl p-5`);

const DrawerBody1 = styled.div(tw`flex justify-evenly mb-16 px-5`);

const WordDiv = styled.div(tw`flex flex-col items-center justify-center`);

const WordEnglish = styled.p(tw`text-2xl mb-5 font-bold`);

const WordKorean = styled.p(tw`text-xl`);

const ImgWrapper = styled.div(tw`flex justify-center items-center pl-10 ml-10`);

const CustomedImage = styled.img(
  tw`rounded-md bg-slate-500`,
  css`
    height: 9rem;
    width: 16rem;
  `
);

const DrawerBody2 = styled.div(tw`flex flex-col items-center mb-16 px-10`);

const ExampleEnglish = styled.p(tw`mb-5 font-bold text-lg`);

const ExampleKorean = styled.p(tw`text-lg`);

const DrawerEnd = styled.div(tw`flex justify-center`);
