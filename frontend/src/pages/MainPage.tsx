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

export default MainPage