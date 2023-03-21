import React, { useState, useEffect } from 'react'
import tw, { css, styled, theme } from 'twin.macro'
import { NewContent, Animation, Drawing, HallofFame, Banner, PopularContents } from '../components/carousel/index'
import { Container, Header, Footer } from '../components/common/index'



const items = [
  <NewContent/>,
  <Animation/>,
  <Drawing/>,
];


const MainPage = () => {

  return (
    <Container isOverflowed>
    {/* Header */}
      <Header/>
      <DummyDiv></DummyDiv>

    {/* Banner */}
      <Banner></Banner>
    {/* // Popular Contents */}
      <PopularContents></PopularContents>

    {/* 명예의 전당 */}
      <HallofFame></HallofFame>
    {/* <HallofFame></HallofFame> */}

    {/* Footer  */}
      <Footer/>
    </Container>
  )
}

// style
const DummyDiv = styled.div(
  tw`h-16`
)


// Popular Items
const PopularContentsWrapper = styled.div(
  tw`flex py-48`
)

const ArrowDiv = styled.div(
  tw`w-2/12 flex items-center`
)

const PrevDiv = styled.div(
  tw`w-full text-right`
)

const NextDiv = styled.div(
  tw`w-full`
)

const ArrowButton = styled.button(
  tw`btn-circle bg-yellowL text-brownL border-black shadow-lg`,
)

const SliderDiv = styled.div(
  tw`w-10/12 overflow-hidden`
)

const Slider = styled.ul(
  tw`flex w-full transition-[margin] duration-700`
)

const SliderItems = styled.li(
  tw`w-96 p-5`
)

const SliderItemsWrapper = styled.div(
  tw`border rounded-lg p-5 h-full`
)

const ThumbNail = styled.img(
  tw`h-52 w-full object-cover rounded-md bg-slate-500`
)

const ThumbNailTitle = styled.h2(
  tw`mt-2 text-2xl font-bold text-gray-700`
)

const ThumbNailDescription = styled.p(
  tw`truncate mt-2 text-gray-500`
)

const PopularContentsButton = styled.button(
  tw`mt-4 px-6 py-3 rounded-md bg-brownL text-black font-bold`
)

export default MainPage