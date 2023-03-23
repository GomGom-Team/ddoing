import React from 'react';
import tw, { css, styled, theme } from 'twin.macro'

// type Props = {
//   toggleDrawer  (anchor: Anchor, open: boolean) => void
// }


const ResultPage = () => {
  return (
    <StyledDrawer>
      <StyledDiv> 
        <DrawerHead> SUCCESS </DrawerHead>

          <DrawerBody1>
            <WordDiv>
              <WordEnglish>Apple</WordEnglish>
              <WordKorean>사과</WordKorean>
            </WordDiv>
            <ImgWrapper>
              <CustomedImage></CustomedImage>
            </ImgWrapper>
          </DrawerBody1>

          <DrawerBody2>
            <ExampleEnglish>Apple is delicious</ExampleEnglish>
            <ExampleKorean>사과는 맛있어~</ExampleKorean>
          </DrawerBody2>

        <DrawerEnd>
          <button>NEXT</button>
        </DrawerEnd>
      </StyledDiv>
    </StyledDrawer>
  );
};

export default ResultPage;

// style

const StyledDrawer = styled.div(
  tw`bg-greenC w-screen h-screen flex justify-center items-center`
)

const StyledDiv = styled.div(
  tw`border-red-500`,
  css`
    width: 40rem;
    height: 40rem;
  `
)

const DrawerHead = styled.h1(
  tw`flex justify-center mb-16 text-7xl p-5`
)


const DrawerBody1 = styled.div(
  tw`flex justify-evenly mb-16`
)

const WordDiv = styled.div(
  tw`flex flex-col items-center justify-center`
)

const WordEnglish = styled.h1(
  tw`text-4xl mb-5`
)

const WordKorean = styled.h1(
  tw`text-3xl`
)


const ImgWrapper = styled.div(
  tw`flex justify-center items-center pl-10 ml-10`
)

const CustomedImage = styled.img(
  tw`object-cover rounded-md bg-slate-500`,
  css`
    height: 9rem;
    width: 16rem;
  `
)

const DrawerBody2 = styled.div(
  tw`flex flex-col items-center mb-16`
)

const ExampleEnglish = styled.h1(
  tw`text-3xl mb-5`
)

const ExampleKorean = styled.h1(
  tw`text-2xl`
)

const DrawerEnd = styled.div(
  tw`flex justify-center`
)