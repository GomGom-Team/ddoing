import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/configStore.hooks";
import tw, { css, styled, theme } from "twin.macro";
import { Container } from "../common/index"
import axios from "axios";

interface DrawingListType {
  userId: string
  drawingPath: string
  percentage: number
  word: string
  mean: string
}

interface RemindVideoListType{
  id: number | null
  title: string | null
  runningTime: number | null
  pathUrl: string | null
  bestScore: number | null
  roles: string[] | []
}

const Remind = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  const [drawingList, setDrawingList] = useState<DrawingListType[] | null>(null)
  const [remindVideoList, setRemindVideoList] = useState<RemindVideoListType[] | null>(null)

  const drawingListHandler = () => {
    axios.get(`https://j8a103.p.ssafy.io/api/drawing/myRecent/${user.id}`)
    .then(res => {
      console.log(res.data)
      setDrawingList(res.data)
    })
    .catch(err => console.log(err));
  }

  const remindVideoListHandler = () => {
    axios.get(`https://j8a103.p.ssafy.io/api/animations/myStudy/${user.id}`)
    .then(res => {
      console.log(res.data)
      setRemindVideoList(res.data)
    })
    .catch(err => console.log(err)); 
  }



  useEffect(() => {
    drawingListHandler()
    remindVideoListHandler()
  }, []);
  
  
  return (
    <Container isOverflowed>
        <AniWrapDiv>
          <AniDiv>최근 공부한 영상 조회</AniDiv>
          <AniListDiv>
            {remindVideoList&&
            remindVideoList.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <div onClick={() => navigate(`/video/${item.id}`)}>
                    <img
                      src={`https://img.youtube.com/vi/${item.pathUrl}/0.jpg`}
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
          {drawingList&&
          drawingList.map((item: any, index: number) => {
            return(
              <div key={index}>
                <img src={`https://j8a103.p.ssafy.io/assets/img_backend/${item.drawingPath}`} width={200} height={200} alt="" />
              </div>
            )
          })}
        </DrawWrapDiv>
    </Container>
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
