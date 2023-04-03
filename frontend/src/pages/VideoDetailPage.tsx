import React, { useEffect, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import PlayerScript from "../components/animation/PlayerScript";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import { animationGetAction } from "../redux/modules/animation";
import { Header } from "../components/common";

const VideoDetailPage = () => {
  var idx = "";
  const dispatch = useAppDispatch();
  const [act, setAct] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [videoIdx, setVideoIdx] = useState(0);
  const location = useLocation();
  const user = useAppSelector((state) => state.user.userData);

  const selectAct = (role: string) => {
    setAct(role);
  };
  const close = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    var path = location.pathname;
    var parse = path.split("/");
    idx = parse[2];
    setVideoIdx(Number(idx));
  }, []);

  useEffect(() => {
    if (videoIdx > 0) {
      console.log("HelloHello " + videoIdx);
      dispatch(animationGetAction({ userId: user.id, animationId: videoIdx }));
    }
  }, [videoIdx]);

  const video = useAppSelector((state) => state.animation.getAnimation);

  return (
    <>
      <Header />
      <WrapperDiv>
        <div>
          {isOpen === true ? (
            <MyActDiv>
              <ChoiceDiv>Choose character</ChoiceDiv>
              <BtnWrapperDiv>
                {video?.data?.roles.map((role: string, idx: number) => {
                  return (
                    <ActChoiceBtn
                      onClick={() => {
                        selectAct(role),
                          setIsOpen(!isOpen),
                          setIsStart(!isStart);
                      }}
                      key={idx}
                    >
                      <ActChoiceDiv>
                        <ActChoiceImg src={`/assets/img/${role}.png`} />
                      </ActChoiceDiv>
                      <ActChoiceName>{role}</ActChoiceName>
                    </ActChoiceBtn>
                  );
                })}
              </BtnWrapperDiv>
            </MyActDiv>
          ) : (
            <MyActDiv2></MyActDiv2>
          )}
          <VideoDiv>
            <PlayerScript
              myAct={act}
              isVideoStart={isStart}
              videoIdx={videoIdx}
            />
          </VideoDiv>
        </div>
        <div></div>
      </WrapperDiv>
    </>
  );
};

export default VideoDetailPage;

const MyActDiv = styled.div`
  position: absolute;
  display: grid;
  width: 1000px;
  height: 500px;
  z-index: 999;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: "insungitCutelivelyjisu";
  font-size: 40px;
  color: white;
`;

const MyActDiv2 = styled.div`
  position: absolute;
  display: grid;
  width: 1000px;
  height: 500px;
  z-index: 999;
  align-items: center;
  justify-content: center;
  background-color: none;
  font-family: "insungitCutelivelyjisu";
  font-size: 40px;
  color: white;
`;

const ChoiceDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActChoiceDiv = styled.div`
  width: 80px;
  height: 80px;
  display: grid;
  border-radius: 100%;
  overflow: hidden;
  border: 3px outset rgba(156, 122, 219, 0.67);
`;

const ActChoiceName = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;
const ActChoiceImg = styled.img`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const ActChoiceBtn = styled.button`
  display: grid;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  font-family: "PyeongChangPeace-Bold";
  padding: 5px;
  :hover {
    color: aquamarine;
  }
`;

const BtnWrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
`;

const VideoDiv = styled.div`
  display: grid;
`;

const WrapperDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 5vw;
  margin-top: 10vw;
  align-items: center;
  justify-content: center;
`;
