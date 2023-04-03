import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import tw, { css, styled, theme } from "twin.macro";
import {
  animationListGetAction,
  animationSearchGetAction,
  animationStarGetAction,
  animationDoneGetAction,
} from "../redux/modules/animation";

const VideoListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const starList = ["선택", 1, 2, 3];
  const [selectedStar, setSelectedStar] = useState("선택");
  const [selectedDone, setSelectedDone] = useState("선택");
  const [isNow, setIsNow] = useState("");
  const user = useAppSelector((state) => state.user.userData);
  // const [testArray, setTestArray] = useState([]);
  // const [videoSearchList, setVideoSearchList]: any = useState([]);
  const changeInputData = (e: any) => {
    setInputData(e.target.value);
  };
  const videoList = useAppSelector((state) => state.animation.getAnimationList);
  useEffect(() => {
    dispatch(animationListGetAction(user.id));
  }, []);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && inputData !== "") {
      dispatch(
        animationSearchGetAction({ keyword: inputData, userId: user.id })
      );
    }
  };
  const videoSearchList = useAppSelector(
    (state) => state.animation.getAnimationSearch
  );
  const handleSelectStar = (e: any) => {
    setSelectedStar(e.target.value);
  };

  // console.log("select ", selected);
  useEffect(() => {
    if (selectedStar !== "선택") {
      dispatch(animationStarGetAction({ userId: user.id, star: selectedStar }));
    }
  }, [selectedStar]);

  useEffect(() => {
    if (selectedDone !== "선택") {
      dispatch(
        animationDoneGetAction({
          userId: user.id,
          done: selectedDone === "Done" ? 1 : 0,
        })
      );
    }
  }, [selectedDone]);

  const videoStarList = useAppSelector(
    (state) => state.animation.getAnimationStar
  );

  const videoDoneList = useAppSelector(
    (state) => state.animation.getAnimationDone
  );

  return (
    <AllWrapperDiv>
      <div>
        <div>별 개수 필터링</div>
        <select onChange={handleSelectStar} value={selectedStar}>
          {starList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>수강여부</div>
        <button onClick={() => setSelectedDone("Done")}>Done</button>
        <button onClick={() => setSelectedDone("NotDone")}>Not Done</button>
        {/* <select onChange={handleSelectDone} value={selectedDone}>
          {doneList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select> */}
      </div>
      <div>
        <input
          placeholder="검색하기"
          className="serach"
          value={inputData}
          onChange={changeInputData}
          onKeyDown={handleKeyPress}
        />
      </div>
      <ListWrapperDiv>
        <div>여긴 영상 리스트</div>
        {videoList?.data?.map((item: any, index: number) => {
          return (
            <div key={index} onClick={() => navigate(`/video/${item.id}`)}>
              <img src={`https://img.youtube.com/vi/${item.pathUrl}/0.jpg`} />
              <div>{item.id}</div>
              <div>{item.title}</div>
              <div>{item.runningTime}</div>
              <div>{item.pathUrl}</div>
              <div>{item.bestScore}</div>
              {item.roles.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <div>{item}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </ListWrapperDiv>
      <SearchWrapperDiv>
        <div>여기부터 검색결과</div>
        {videoSearchList?.data?.map((item: any, index: number) => {
          return (
            <div key={index} onClick={() => navigate(`/video/${item.id}`)}>
              <img src={`https://img.youtube.com/vi/${item.pathUrl}/0.jpg`} />
              <div>{item.id}</div>
              <div>{item.title}</div>
              <div>{item.runningTime}</div>
              <div>{item.pathUrl}</div>
              <div>{item.bestScore}</div>
              {item.roles.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <div>{item}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </SearchWrapperDiv>

      <StarWrapperDiv>
        <div>여기부터 별결과</div>
        {videoStarList?.data?.map((item: any, index: number) => {
          return (
            <div key={index} onClick={() => navigate(`/video/${item.id}`)}>
              <img src={`https://img.youtube.com/vi/${item.pathUrl}/0.jpg`} />
              <div>{item.id}</div>
              <div>{item.title}</div>
              <div>{item.runningTime}</div>
              <div>{item.pathUrl}</div>
              <div>{item.bestScore}</div>
              {item.roles.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <div>{item}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </StarWrapperDiv>

      <DoneWrapperDiv>
        <div>여기부터 수강여부결과</div>
        {videoDoneList?.data?.map((item: any, index: number) => {
          return (
            <div key={index} onClick={() => navigate(`/video/${item.id}`)}>
              <img src={`https://img.youtube.com/vi/${item.pathUrl}/0.jpg`} />
              <div>{item.id}</div>
              <div>{item.title}</div>
              <div>{item.runningTime}</div>
              <div>{item.pathUrl}</div>
              <div>{item.bestScore}</div>
              {item.roles.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <div>{item}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </DoneWrapperDiv>
    </AllWrapperDiv>
  );
};

export default VideoListPage;

const AllWrapperDiv = styled.div`
  display: flex;
`;

const ListWrapperDiv = styled.div`
  display: grid;
`;

const SearchWrapperDiv = styled.div`
  display: grid;
`;

const StarWrapperDiv = styled.div`
  display: grid;
`;

const DoneWrapperDiv = styled.div`
  display: grid;
`;
