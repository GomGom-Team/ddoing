import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/configStore.hooks";
import tw, { css, styled, theme } from "twin.macro";
import { Box } from "@mui/material";
import { Container } from "../common/index";
import axios from "axios";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

interface DrawingListType {
  userId: string;
  drawingPath: string;
  percentage: number;
  word: string;
  mean: string;
}

interface RemindVideoListType {
  id: number | null;
  title: string | null;
  runningTime: number | null;
  pathUrl: string | null;
  bestScore: number | null;
  roles: string[] | [];
}

const Remind = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  const [drawingList, setDrawingList] = useState<DrawingListType[] | null>(
    null
  );
  const [remindVideoList, setRemindVideoList] = useState<
    RemindVideoListType[] | null
  >(null);

  const drawingListHandler = () => {
    axios
      .get(`https://j8a103.p.ssafy.io/api/drawing/myRecent/${user.id}`)
      .then((res) => {
        // console.log(res.data);
        setDrawingList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const remindVideoListHandler = () => {
    axios
      .get(`https://j8a103.p.ssafy.io/api/animations/myStudy/${user.id}`)
      .then((res) => {
        // console.log(res.data);
        setRemindVideoList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    drawingListHandler();
    remindVideoListHandler();
  }, []);

  return (
    <AllWrapDiv>
      <Container isOverflowed>
        <AniWrapDiv>
          <AniDiv>최근 공부한 영상 조회</AniDiv>
          <AniListDiv>
            {remindVideoList &&
              remindVideoList.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <RecentVideoDiv
                      onClick={() => navigate(`/video/${item.id}`)}
                    >
                      {item.pathUrl && (
                        <RecentVideo
                          src={`https://img.youtube.com/vi/${item.pathUrl}/0.jpg`}
                          alt=""
                        />
                      )}
                      {!item.pathUrl && <NullImg></NullImg>}
                      {item.title && (
                        <RecentVideoTitle>
                          {item.title.split(" - ")[1]}
                        </RecentVideoTitle>
                      )}
                      {!item.title && <div></div>}
                      <div></div>
                    </RecentVideoDiv>
                  </div>
                );
              })}
          </AniListDiv>
        </AniWrapDiv>
        <div>
          <DrawingWrapperTitle>내가 그린 그림</DrawingWrapperTitle>
          <DrawWrapDiv>
            {drawingList &&
              drawingList.map((item: any, index: number) => {
                return (
                  <RecentDrawingDiv key={index}>
                    {item.drawingPath && (
                      <RecentDraw
                        src={`https://j8a103.p.ssafy.io/assets/img_backend/${item.drawingPath}`}
                        width={200}
                        height={200}
                        alt=""
                      />
                    )}
                    {!item.drawingPath && <NullImg>아직 그림이 없어요</NullImg>}
                  </RecentDrawingDiv>
                );
              })}
          </DrawWrapDiv>
        </div>
      </Container>
    </AllWrapDiv>
  );
};

export default Remind;

const AllWrapDiv = styled.div`
  display: flex;
  width: 80vw;
  height: 50vh;
  flex-wrap: wrap;
  /* padding-bottom: 10vh; */
  /* padding-top: 2rem; */
  margin-left: 20vw;
`;

const AniWrapDiv = styled.div`
  display: grid;
`;

const AniDiv = styled.div`
  display: grid;
  font-size: 2vw;
  padding-bottom: 1em;
`;

const AniListDiv = styled.div(tw`flex items-center justify-center`);

const DrawWrapDiv = styled.div`
  display: flex;
  padding-bottom: 13vh;
`;

const RecentVideoDiv = styled.div(
  tw`w-72 flex items-center justify-center flex-col`,
  css`
    margin-right: 2vw;
  `
);

const RecentVideo = styled.img(tw`h-48 w-96 object-cover border-4 p-5`);
const RecentVideoTitle = styled.p(
  tw`truncate mt-2 text-center p-5`,
  css`
    font-family: "ONE-Mobile-Title";
    font-size: 1.25vw;
  `
);

const RecentDrawingDiv = styled.div(
  tw`w-72 flex justify-center items-center`,
  css`
    margin-right: 2vw;
  `
);

const NullImg = styled.div(
  tw`flex justify-center items-center h-36 w-48 object-cover bg-slate-500 border-4 p-5`
);

const RecentDraw = styled.img(tw`h-48 w-96 object-cover border-4 p-5`);

const DrawingWrapperTitle = styled.p(
  tw`pt-12`,
  css`
    font-size: 2vw;
    padding-bottom: 1em;
  `
);

const boxStyle = {
  position: "relative",
  transform: "translateX(-50%)",
  fontFamily: "insungitCutelivelyjisu",
  width: "20rem",
  height: "25rem",
};
