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
  const [selectedStar, setSelectedStar] = useState(0);
  const [selectedDone, setSelectedDone] = useState("선택");
  const [isNow, setIsNow] = useState("");
  const user = useAppSelector((state) => state.user.userData);
  const [testArray, setTestArray] = useState<any>([]);
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
  // const handleSelectStar = (e: any) => {
  //   setSelectedStar(e.target.value);
  // };

  const handleClick = (status: string) => {
    if (status === "Star") {
      setTestArray(videoStarList);
    } else if (status === "Done") {
      setTestArray(videoDoneList);
    } else if (status === "Search") {
      setTestArray(videoSearchList);
    }
    console.log("now status is ", status);
  };

  // console.log("select ", selected);
  useEffect(() => {
    dispatch(animationStarGetAction({ userId: user.id, star: selectedStar }));
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
        <button
          onClick={() => {
            setSelectedStar(3);
            handleClick("Star");
          }}
        >
          3개
        </button>
        <button
          onClick={() => {
            setSelectedStar(2);
            handleClick("Star");
          }}
        >
          2개
        </button>
        <button
          onClick={() => {
            setSelectedStar(1);
            handleClick("Star");
          }}
        >
          1개
        </button>
        {/* <select
          onChange={handleSelectStar}
          value={selectedStar}
          onClick={() => handleClick("Star")}
        >
          {starList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select> */}
      </div>
      <div>
        <div>수강여부</div>
        <button
          onClick={() => {
            setSelectedDone("Done");
            handleClick("Done");
          }}
        >
          Done
        </button>
        <button
          onClick={() => {
            setSelectedDone("NotDone");
            handleClick("Done");
          }}
        >
          Not Done
        </button>
        {/* <select onChange={handleSelectDone} value={selectedDone}>
          {doneList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select> */}
      </div>
      <div onClick={() => handleClick("Search")}>
        <input
          placeholder="검색하기"
          className="serach"
          value={inputData}
          onChange={changeInputData}
          onKeyDown={handleKeyPress}
        />
      </div>
      <StyledDiv>hello</StyledDiv>

      <ListWrapperDiv>
        <div>여긴 영상 리스트</div>
        {videoList?.data?.map((item: any, index: number) => {
          return (
            <div key={index} onClick={() => navigate(`/video/${item.id}`)}>
              <img
                src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
              />
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
      {testArray?.data?.length !== 0 && (
        <SearchWrapperDiv>
          <div>여기부터 검색결과</div>
          {testArray?.data?.map((item: any, index: number) => {
            return (
              <div key={index} onClick={() => navigate(`/video/${item.id}`)}>
                <img
                  src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
                />
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
      )}

      <SearchWrapperDiv>
        <div>여기부터 검색결과</div>
        {videoSearchList?.data?.map((item: any, index: number) => {
          return (
            <div key={index} onClick={() => navigate(`/video/${item.id}`)}>
              <img
                src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
              />
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
              <img
                src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
              />
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
              <img
                src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
              />
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

const StyledDiv = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  box-shadow: 0.3rem 0.3rem 0.6rem var(#c8d0e7),
    -0.2rem -0.2rem 0.5rem var(#ffffff);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  color: var(#9baacf);
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(#e4ebf5);
  &:active {
    box-shadow: inset 0.2rem 0.2rem 0.5rem var(#c8d0e7),
      inset -0.2rem -0.2rem 0.5rem var(#ffffff);
    color: var(#6d5dfc);
  }
  &:hover {
    color: var(#6d5dfc);
  }
`;

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
