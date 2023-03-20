import React, { useCallback, useRef } from 'react';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';

const Wrap = styled.div`
    position: relative;
    padding-bottom: 70px;
    overflow: hidden;
	
    // 1. Global style 추가했던 것을 슬라이드 상단에 Wrap을 만들어 여기서 선언했습니다.
    .slick-slide {
        display: inline-block;
    }
	
    // 2. 제가 추가한 커스텀 클래스입니다.
    // pagination 부분입니다.
    .slick-dots.slick-thumb {
        position: absolute;
        bottom: 0;
        left: 50%;
        padding: 0;
        margin: 0;
        list-style: none;
        transform: translate(-50%);

        li {
            position: relative;
            display: inline-block;
			
            &.slick-active {
                span {
                    filter: none;
                }
            }
        }
    }  
`;

const SlickItems = styled.div`
    width: 100%;    
    height: 400px;
    text-align: center;

    img {
        max-width: 100%;
        height: 100%;
        vertical-align: top;
    }
`;

const defaultButtonStyle = css`
    position: absolute;
    top: calc(50% - 50px);
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    cursor: pointer;
`;

const PrevButton = styled.button`
    ${defaultButtonStyle}
    left: 0;
`;

const NextButton = styled.button`
    ${defaultButtonStyle}
    right: 0;
`;

;
// 4. 샘플이미지
const images = [
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212614_fawslbwd.jpg",
        title: "1"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212649_esiekzxf.jpg",
        title: "2"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212707_zcrkccgp.jpg",
        title: "3"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212724_pacwfbiz.jpg",
        title: "4"
    },
];

const Slide = () => {
	
    // 5. custom arrows를 만들어 ref를 통해 제어합니다.
    const slickRef = useRef(null);

	// 6. slick에 추가할 세팅입니다.
    const settings = {
        dots: true,
        
        // 2. 제가 추가한 커스텀 클래스입니다. (pagination)
        dotsClass: "slick-dots slick-thumb",
        
        // 5. custom arrows를 만들기 위해 기본 arrows옵션을 false로 합니다.
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        
    };
    
	// 5. custom arrows 동작 함수를 만듭니다.
    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

    return (
        <Wrap>
			
			// 5.6.
            // custom arrows를 위해 ref를 설정합니다.
            // 세팅을 넣어줍니다. (공식문서 docs참고)
			<Slick ref={slickRef} {...settings}>
            	
                // 4. 샘플이미지로 반복문을 돌려 슬라이드 아이템을 렌더합니다.
                {images.map((v, i) => {
                    return (
                        <SlickItems key={`${v.title}_${i}`}>
                            <img src={v.src} />
                        </SlickItems>
                    )
                })}
            </Slick>
			
            // 5. custom arrows입니다.
            <>
                <PrevButton onClick={previous}>
                    Prev
                    <span className="hidden">이전</span>
                </PrevButton>

                <NextButton onClick={next}>
                    Next
                    <span className="hidden">다음</span>
                </NextButton>
            </>
        </Wrap>
    );
};

export default Slide;
