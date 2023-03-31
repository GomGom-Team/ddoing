import React from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { Button } from '../common/index'

type Anchor = "top";

interface wordListType {
  id : number
  word: string
  mean: string
  engSentence: string
  koSentence: string
}

interface ResultPageProps {
  anchor: Anchor
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  index: number
  maxStage: number
  wordList: wordListType[]
  isDone : boolean
  restartHandler(): void
};

const ResultPage = ({ isDone, anchor, toggleDrawer,index, maxStage, wordList, restartHandler }: ResultPageProps) => {
  React.useEffect(() => {
    console.log("mounted",isDone)
  },[])

  React.useEffect(() => {
    console.log("updated", isDone)
  },[isDone])

  const reStart = () => {
    restartHandler()
    console.log("재시작")
  }

  if (isDone) {
    return(
      <StyledDrawer>

      <StyledWrapper>
        <ResultDiv> 
          <DrawerHead> 잘 그리셨어요! </DrawerHead>

          <ImgWrapper>
            <ItemWrapper>
              <CustomedImage></CustomedImage>
              <h2>{ wordList[0].word }</h2>
            </ItemWrapper>

            <ItemWrapper>
              <CustomedImage></CustomedImage>
              <h2>{ wordList[1].word }</h2>
            </ItemWrapper>

            <ItemWrapper>
              <CustomedImage></CustomedImage>
              <h2>{ wordList[2].word }</h2>
            </ItemWrapper>

            <ItemWrapper>
              <CustomedImage></CustomedImage>
              <h2>{ wordList[3].word }</h2>
            </ItemWrapper>

            <ItemWrapper>
              <CustomedImage></CustomedImage>
              <h2>{ wordList[4].word }</h2>
            </ItemWrapper>

            <ItemWrapper>
              <CustomedImage></CustomedImage>
              <h2>{ wordList[5].word }</h2>
            </ItemWrapper>

          </ImgWrapper>

          <DrawerEnd>
            <Button variant='secondary' onClick={reStart}>다시하기</Button>
          </DrawerEnd>
        </ResultDiv>
      </StyledWrapper>
    </StyledDrawer>
    )
  }


  return (
    <StyledDrawer>
      <WordHeader>
        {index + 1} / {maxStage}
      </WordHeader>
      <StyledWrapper>
        <StyledDiv> 
          <DrawerHead> 다음을 그려보세요 </DrawerHead>
            <DrawerBody1>
              <WordDiv>
                <WordEnglish>{ wordList[index]?.word }</WordEnglish>
              </WordDiv>
            </DrawerBody1>

          <DrawerEnd>
            <Button variant='secondary' onClick={toggleDrawer(anchor, false)}>그려볼게요!</Button>
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
    font-family: 'insungitCutelivelyjisu';
  `
)

const StyledWrapper = styled.div(
  tw`w-screen h-screen flex justify-center items-center`
)

const WordHeader = styled.div(
  tw`text-lg text-center top-10 text-gray-400`,
  css`
    position: relative;
  `
)

const StyledDiv = styled.div(
  tw`flex flex-col`,
  css`
    width: 50rem;
    height: 30rem;
  `
)

const DrawerHead = styled.h1(
  tw`flex justify-center mb-32 text-4xl p-5`
)


const DrawerBody1 = styled.div(
  tw`flex justify-evenly my-16`
)

const WordDiv = styled.div(
  tw`flex flex-col items-center justify-center`
)

const WordEnglish = styled.h1(
  tw`text-4xl mb-5`
)

const DrawerEnd = styled.div(
  tw`flex justify-center`
)

const ResultDiv = styled.div(
  tw`flex flex-col`,
  css`
    width: 50rem;
    height: 44rem;
  `
)

const ImgWrapper = styled.div(
  tw`grid grid-cols-3 gap-8 `
)

const CustomedImage = styled.img(
  tw`object-cover rounded-md bg-slate-500`,
  css`
    height: 9rem;
    width: 16rem;
  `
)

const ItemWrapper = styled.div(
  tw`flex flex-col gap-4 items-center`
)
