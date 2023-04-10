import React, { useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import PlayerScript from "../components/animation/PlayerScript";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import { animationGetAction } from "../redux/modules/animation";
import { Header } from "../components/common";

const VideoDetailPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // User 정보
  const user = useAppSelector((state) => state.user.userData);
  // Video 정보
  const video = useAppSelector((state) => state.animation.getAnimation);

  var idx = "";
  const [act, setAct] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [videoIdx, setVideoIdx] = useState(0);

  // selectAct : 역할 선택
  const selectAct = (role: string) => {
    setAct(role);
  };

  // 로딩시 현재 주소에서 videoIdx 추출하기
  useEffect(() => {
    var path = location.pathname;
    var parse = path.split("/");
    idx = parse[2];
    setVideoIdx(Number(idx));
  }, []);

  // videoIdx가 변경되면, 해당 animation을 가져오기
  useEffect(() => {
    if (videoIdx > 0) {
      dispatch(animationGetAction({ userId: user.id, animationId: videoIdx }));
    }
  }, [videoIdx]);

  return (
    <AllDiv>
      <Header />
      <TVImg src="/assets/img/TV.png" />
      <WrapperDiv>
        {/* 역할 선택 div가 열려있는 상태라면 */}
        {isOpen === true ? (
          <MyActDiv>
            <ChoiceDiv>Choose character</ChoiceDiv>
            <BtnWrapperDiv>
              {video?.data?.roles.map((role: string, idx: number) => {
                return (
                  <ActChoiceBtn
                    onClick={() => {
                      selectAct(role), setIsOpen(!isOpen), setIsStart(!isStart);
                    }}
                    key={idx}
                  >
                    <ActDiv>
                      <ActChoiceWrap>
                        <ActChoiceDiv>
                          <ActChoiceImg src={`/assets/img/${role}.png`} />
                        </ActChoiceDiv>
                      </ActChoiceWrap>
                      <ActChoiceName>{role}</ActChoiceName>
                    </ActDiv>
                  </ActChoiceBtn>
                );
              })}
            </BtnWrapperDiv>
          </MyActDiv>
        ) : (
          <MyActDiv2></MyActDiv2>
        )}
        <VideoDiv>
          {/* 역할 선택 외의 다른 정보는 PlayerScript에서 */}
          <PlayerScript
            myAct={act}
            isVideoStart={isStart}
            videoIdx={videoIdx}
          />
        </VideoDiv>
      </WrapperDiv>
    </AllDiv>
  );
};

export default VideoDetailPage;

const MyActDiv = styled.div`
  position: absolute;
  display: grid;
  width: 42.8vw;
  height: 24vw;
  left: 6vw;
  margin-top: 12vw;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  font-family: "insungitCutelivelyjisu";
  font-size: 60px;
  color: white;
`;

const TVImg = styled.img`
  position: absolute;
  top: 4vw;
  width: 60vw;
  z-index: 0;
`;

const ActChoiceWrap = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MyActDiv2 = styled.div`
  position: absolute;
  display: grid;
  width: 48vw;
  height: 27vw;
  z-index: 999;
  background-color: none;
  font-family: "insungitCutelivelyjisu";
  font-size: 40px;
  color: white;
`;

const ChoiceDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3vw;
  margin-top: 2.5vw;
`;

const ActDiv = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const ActChoiceDiv = styled.div`
  width: 5vw;
  height: 5vw;
  display: grid;
  border-radius: 100%;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  border: 3px outset rgba(156, 122, 219, 0.67);
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ActChoiceName = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: 1.5vw;
`;
const ActChoiceImg = styled.img`
  display: grid;
  width: 5vw;
  height: 5vw;
  object-fit: cover;
`;

const ActChoiceBtn = styled.button`
  display: grid;
  margin-left: 0.75vw;
  margin-right: 0.75vw;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "PyeongChangPeace-Bold";
  padding: 5px;
  :hover {
    color: aquamarine;
  }
`;

const BtnWrapperDiv = styled.div`
  display: flex;
  margin-left: 2vw;
  margin-right: 2vw;
  padding-bottom: 2.5vw;
  align-items: center;
  justify-content: center;
`;

const VideoDiv = styled.div`
  display: grid;
  width: 100vw;
`;

const WrapperDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const AllDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/img/SKY.jpg");
`;
