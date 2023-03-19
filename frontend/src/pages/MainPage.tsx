import React, { useState, useEffect } from 'react'
import tw, { css, styled, theme } from 'twin.macro'
import { NewContent, Animation, Drawing } from '../components/carousel/index'
import { Container, Header, Footer } from '../components/common/index'







const MainPage = () => {
  // // State
  // const [currentIndex, setCurrentIndex] = useState(0);
  // let count = 0

  // // Logic
  // const handleOnNextClick = () => {
  //   count = (count + 1) % featuredImages.length;
  //   setCurrentIndex(count);
  // };

  // const handleOnPrevClick = () => {
  //   const productsLength = featuredImages.length;
  //   count = (currentIndex + productsLength - 1) % productsLength;
  //   setCurrentIndex(count);
  // }
  // // 캐러셀 자동으로 넘기는 로직
  // useEffect(() => {
  //   startSlider();
  // }, []);

  // const startSlider = () => {
  //   setInterval(() => {
  //     handleOnNextClick();
  //   }, 3000);
  // };

  // Popular Content 
// State
let sliderContainer = document.getElementById('sliderContainer');
let slider = document.getElementById('slider');
let cards = slider?.getElementsByTagName('li');

// Logic
let SliderContainerWidth = sliderContainer?.clientWidth;
let elementsToShow = 3;
if (SliderContainerWidth){
  let cardWidth = SliderContainerWidth/elementsToShow;
  if(slider&&cards){
    slider.style.width = cards.length*cardWidth + 'px';
    for (let index = 0; index < cards.length; index++) {
      const element = cards[index]
      element.style.width = cardWidth+'px';
    }
  }
}

    // 뒤로가기 함수
  function prev() {
    if(slider) {
      slider.style.marginLeft = ((+slider.style.marginLeft.slice(0,2))-cardWidth) + 'px'
    }
  }
  // 앞으로 넘기기 함수
  function next() {
    if(slider) {
      slider.style.marginLeft = ((+slider.style.marginLeft.slice(0,2))+cardWidth) + 'px'
    }
  }

  return (
    <Container isOverflowed>
    {/* Header */}
      <Header/>
    {/* // Banner */}
      <div id="1" className="max-w-screen-xl m-auto">
        <div className="w-full relative select-none">
          <div className="bg-greenC w-full">
            HI
          </div>
          <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
            <button className='btn btn-circle'>❮</button>
            <button className='btn btn-circle'>❯</button>
          </div>
          <img src="src/assets/img/img1.jpg" alt="" />
        </div>
      </div>
    {/* // Popular Contents */}
      <section>
        <PopularContentsWrapper>
          <ArrowDiv>
            <PrevDiv>
              <ArrowButton onClick={prev()}>
                ❮
              </ArrowButton>
            </PrevDiv>
          </ArrowDiv>
          <SliderDiv id="sliderContainer">
            <Slider id="slider">
              <SliderItems>
                <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
                  <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
                  <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
                  <PopularContentsButton>컨텐츠 구경하기</PopularContentsButton>
                </SliderItemsWrapper>
              </SliderItems>
              <SliderItems>
                <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
                  <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
                  <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusdam, et quasi consequuntur incidunt alias ut fugit repudiandae inventore quo impedit, ad vel minima beatae excepturi.</ThumbNailDescription>
                  <PopularContentsButton>컨텐츠 구경하기</PopularContentsButton>
                </SliderItemsWrapper>
              </SliderItems>
              <SliderItems>
                <SliderItemsWrapper>
                  <ThumbNail></ThumbNail>
                  <ThumbNailTitle>썸네일 제목</ThumbNailTitle>
                    <ThumbNailDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo ab consequatur a quibusda.</ThumbNailDescription>
                    <PopularContentsButton>컨텐츠 구경하기</PopularContentsButton>
                </SliderItemsWrapper>
              </SliderItems>
            </Slider>
          </SliderDiv>
          <ArrowDiv>
            <NextDiv>
              <ArrowButton onClick={next()}>
                ❯
              </ArrowButton>
            </NextDiv>
          </ArrowDiv>
        </PopularContentsWrapper>
      </section>
    {/* Footer  */}
      <Footer/>
    </Container>
  )
}

// style

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
  tw`btn-circle bg-yellowL text-brownL border-black shadow-lg`
)

const SliderDiv = styled.div(
  tw`w-10/12 overflow-hidden`
)

const Slider = styled.ul(
  tw`flex w-full transition-[margin] duration-700 border border-red-500`
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