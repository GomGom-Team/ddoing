import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { animationRemindGetAction } from "../../redux/modules/animation";
import Slider from "react-slick";
import NextArrow2 from "../carousel/NextArrow2";
import PrevArrow2 from "../carousel/PrevArrow2";
import tw, { css, styled, theme } from "twin.macro";

interface DrawingListType {
  userId: string;
  drawingPath: string;
  percentage: number;
  word: string;
  mean: string;
}

interface MypagePropsType {
  drawingList: DrawingListType[];
}

const Remind = ({ drawingList }: MypagePropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  // useEffect(() => {
  //   dispatch(animationRemindGetAction(user.id));
  // }, []);

  const remindVideoList = useAppSelector(
    (state) => state.animation.getAnimationRemind
  );

  return (
    <AllWrapDiv>
      <AniWrapDiv>
        <AniDiv>최근 공부한 영상 조회</AniDiv>
        <AniListDiv>
          {remindVideoList?.data?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <div onClick={() => navigate(`/video/${item.id}`)}>
                  <img
                    src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
                  />
                  <div>{item.title}</div>
                  <div></div>
                </div>
              </div>
            );
          })}
        </AniListDiv>
      </AniWrapDiv>
      <DrawWrapDiv>
        <div>내가 그린 그림</div>
        {drawingList.map((item: any, index: number) => {
          return <div key={index}>{item.userId}</div>;
        })}
      </DrawWrapDiv>
    </AllWrapDiv>
  );
};

export default Remind;

const AllWrapDiv = styled.div`
  display: grid;
`;

const AniWrapDiv = styled.div`
  display: grid;
`;

const AniDiv = styled.div`
  display: grid;
`;

const AniListDiv = styled.div`
  display: flex;
`;

const DrawWrapDiv = styled.div`
  display: flex;
`;
