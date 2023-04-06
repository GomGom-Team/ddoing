import React from "react";
import { useNavigate } from "react-router-dom";
import tw, { css, styled, theme } from "twin.macro";
import { Button } from "../common/index";
import { DrawingCard } from "../carousel/index";

type Anchor = "top";

interface wordListType {
  id: number;
  word: string;
  mean: string;
  engSentence: string;
  koSentence: string;
  picturePath: string;
}

interface ResultPageProps {
  anchor: Anchor;
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  index: number;
  maxStage: number;
  wordList: wordListType[];
  isDone: boolean;
  restartHandler(): void;
}

const ResultPage = ({
  isDone,
  anchor,
  toggleDrawer,
  index,
  maxStage,
  wordList,
  restartHandler,
}: ResultPageProps) => {
  React.useEffect(() => {
    console.log("mounted", isDone);
  }, []);

  React.useEffect(() => {
    console.log("updated", isDone);
  }, [isDone]);

  const reStart = () => {
    restartHandler();
    console.log("재시작");
  };

  const navigate = useNavigate();

  if (isDone) {
    return (
      <StyledDrawer>
        <StyledWrapper>
          <ExitButton onClick={() => navigate("/main")}>X</ExitButton>
          <ResultDiv>
            <ResultHead> 잘 그리셨어요! </ResultHead>

            <DrawingCard wordList={wordList} index={index} />

            <DrawerEnd>
              <Button variant="secondary" onClick={reStart}>
                다시하기
              </Button>
            </DrawerEnd>
          </ResultDiv>
        </StyledWrapper>
      </StyledDrawer>
    );
  }

  return (
    <StyledDrawer>
      <StyledWrapper>
        <StyledDiv>
          <WordHeader>
            {index + 1} / {maxStage}
          </WordHeader>
          <DrawerHead> 다음을 그려보세요 </DrawerHead>
          <DrawerBody1>
            <WordDiv>
              <WordEnglish>{wordList[index]?.word}</WordEnglish>
            </WordDiv>
          </DrawerBody1>

          <DrawerEnd>
            <Button variant="secondary" onClick={toggleDrawer(anchor, false)}>
              그려볼게요!
            </Button>
          </DrawerEnd>
        </StyledDiv>
      </StyledWrapper>
    </StyledDrawer>
  );
};

export default ResultPage;

// style

const StyledDrawer = styled.div(
  tw`bg-yellowL`,
  css`
    font-family: "insungitCutelivelyjisu";
  `
);

const StyledWrapper = styled.div(tw`h-screen flex justify-center items-center`);

const WordHeader = styled.div(
  tw`text-lg text-center mb-16 text-gray-400`,
  css`
    position: relative;
  `
);

const StyledDiv = styled.div(
  tw`flex flex-col justify-center`,
  css`
    width: 45rem;
    height: 30rem;
  `
);

const DrawerHead = styled.h1(tw`flex justify-center mb-32 text-4xl p-5`);

const DrawerBody1 = styled.div(tw`flex justify-evenly mb-16`);

const WordDiv = styled.div(tw`flex flex-col items-center justify-center`);

const WordEnglish = styled.h1(tw`text-4xl mb-5`);

const DrawerEnd = styled.div(tw`flex justify-center`);

const ResultDiv = styled.div(
  tw`flex flex-col`,
  css`
    width: 50rem;
    height: 44rem;
  `
);

const ResultHead = styled.h1(tw`flex justify-center text-4xl p-5 mb-16`);

const ExitButton = styled.button(
  tw`absolute 
  top-4 right-4 
  border-2 border-yellowL bg-brownL
  px-3 pt-2 pb-1 rounded transform duration-75
  hocus:(scale-105 text-yellow-400)
  `,
  css`
    font-family: "insungitCutelivelyjisu";
    font-size: 18px;
    box-shadow: 0 0.1em 0 0.1em rgba(0, 0, 0, 0.25);
    color: ${theme`colors.white`};
  `
);
