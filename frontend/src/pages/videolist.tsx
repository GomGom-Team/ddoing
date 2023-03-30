import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import tw, { css, styled, theme } from "twin.macro";
import {
  animationListGetAction,
  animationSearchGetAction,
  animationStarGetAction,
} from "../redux/modules/animation";

const videolist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const starList = ["선택", 1, 2, 3];
  const [selected, setSelected] = useState("선택");
  // const [videoSearchList, setVideoSearchList]: any = useState([]);
  const changeInputData = (e: any) => {
    setInputData(e.target.value);
  };
  const videoList = useAppSelector((state) => state.animation.getAnimationList);
  useEffect(() => {
    dispatch(animationListGetAction("userB"));
  }, []);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && inputData !== "") {
      dispatch(
        animationSearchGetAction({ keyword: inputData, userId: "userB" })
      );
    }
  };
  const videoSearchList = useAppSelector(
    (state) => state.animation.getAnimationSearch
  );
  const handleSelect = (e: any) => {
    setSelected(e.target.value);
  };

  console.log("select ", selected);
  useEffect(() => {
    if (selected !== "선택") {
      dispatch(animationStarGetAction({ userId: "userB", star: selected }));
    }
  }, [selected]);

  const videoStarList = useAppSelector(
    (state) => state.animation.getAnimationStar
  );

  return (
    <AllWrapperDiv>
      <div>
        <div>별 개수 필터링</div>
        <select onChange={handleSelect} value={selected}>
          {starList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
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
    </AllWrapperDiv>
  );
};

export default videolist;

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
