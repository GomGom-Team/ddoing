import React, { useEffect, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import MyVideo from "./myvideo";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import { animationGetAction } from "../redux/modules/animation";

const videotest = () => {
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
    <WrapperDiv>
      <div>
        {isOpen === true ? (
          <MyActDiv>
            <ChoiceDiv>What character do you want to play?</ChoiceDiv>
            <BtnWrapperDiv>
              {video?.data?.roles.map((role: string, idx: number) => {
                return (
                  <ActChoiceBtn
                    onClick={() => {
                      selectAct(role), setIsOpen(!isOpen), setIsStart(!isStart);
                    }}
                    key={idx}
                  >
                    {role}
                  </ActChoiceBtn>
                );
              })}
            </BtnWrapperDiv>
          </MyActDiv>
        ) : (
          <MyActDiv2></MyActDiv2>
        )}
        <VideoDiv>
          <MyVideo myAct={act} isVideoStart={isStart} videoIdx={videoIdx} />
        </VideoDiv>
      </div>
      <div></div>
    </WrapperDiv>
  );
};

export default videotest;

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
`;

const ActChoiceBtn = styled.button`
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  :hover {
    color: aquamarine;
  }
`;

const BtnWrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const VideoDiv = styled.div`
  display: grid;
`;

const WrapperDiv = styled.div`
  display: flex;
`;
