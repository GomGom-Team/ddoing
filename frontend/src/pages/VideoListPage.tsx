import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import tw, { css, styled, theme } from "twin.macro";
import { keyframes } from "styled-components";
import {
  animationListGetAction,
  animationSearchGetAction,
  animationStarGetAction,
  animationDoneGetAction,
} from "../redux/modules/animation";
import { Header } from "../components/common";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

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

  const myClickEvent = () => {
    dispatch(animationSearchGetAction({ keyword: inputData, userId: user.id }));
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
      <Header />
      <AllDiv>
        <SelectDiv>
          <StarDiv>
            <StarBtn
              onClick={() => {
                setSelectedStar(3);
                handleClick("Star");
              }}
            >
              <StarImg>
                <img src="/assets/img/Star.png" />
                <img src="/assets/img/Star.png" />
                <img src="/assets/img/Star.png" />
              </StarImg>
            </StarBtn>
            <StarBtn
              onClick={() => {
                setSelectedStar(2);
                handleClick("Star");
              }}
            >
              <StarImg>
                <img src="/assets/img/Star.png" />
                <img src="/assets/img/Star.png" />
              </StarImg>
            </StarBtn>
            <StarBtn
              onClick={() => {
                setSelectedStar(1);
                handleClick("Star");
              }}
            >
              <StarImg>
                <img src="/assets/img/Star.png" />
              </StarImg>
            </StarBtn>
          </StarDiv>
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
          <DoneSelectDiv>
            <DoneBtn
              onClick={() => {
                setSelectedDone("Done");
                handleClick("Done");
              }}
            >
              <DoneImg>
                <img src="/assets/img/Done.png" />
              </DoneImg>
            </DoneBtn>
            <NotDoneBtn
              onClick={() => {
                setSelectedDone("NotDone");
                handleClick("Done");
              }}
            >
              <NotDoneImg>
                <img src="/assets/img/NotDone.png" />
              </NotDoneImg>
            </NotDoneBtn>
          </DoneSelectDiv>
          <SearchDiv onClick={() => handleClick("Search")}>
            <SearchInput
              placeholder="검색하기"
              className="serach"
              value={inputData}
              onChange={changeInputData}
              onKeyDown={handleKeyPress}
            />
            <SearchIconBtn>
              <img src="/assets/img/Search.png" />
            </SearchIconBtn>
          </SearchDiv>
        </SelectDiv>

        <ListWrapperDiv>
          {/* <div>여긴 영상 리스트</div> */}
          {videoList?.data?.map((item: any, index: number) => {
            return (
              <EachBtn
                key={index}
                onClick={() => navigate(`/video/${item.id}`)}
              >
                <VideoImg>
                  <img
                    src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
                  />
                </VideoImg>
                <VideoTitleDiv>{item.title.split(" - ")[1]}</VideoTitleDiv>
                <VideoTimeDiv>
                  {(item.runningTime - (item.runningTime % 60)) / 60} :{" "}
                  {item.runningTime % 60 >= 10
                    ? item.runningTime % 60
                    : "0" + (item.runningTime % 60)}
                </VideoTimeDiv>
                {item.bestScore >= 20 && item.bestScore <= 40 && (
                  <VideoScoreDiv>
                    <img src="/assets/img/EmptyStar.png" />
                    <img src="/assets/img/EmptyStar.png" />
                    <img src="/assets/img/Star.png" />
                  </VideoScoreDiv>
                )}
                {item.bestScore >= 41 && item.bestScore <= 75 && (
                  <VideoScoreDiv>
                    <img src="/assets/img/EmptyStar.png" />
                    <img src="/assets/img/Star.png" />
                    <img src="/assets/img/Star.png" />
                  </VideoScoreDiv>
                )}
                {item.bestScore >= 76 && item.bestScore <= 100 && (
                  <VideoScoreDiv>
                    <img src="/assets/img/Star.png" />
                    <img src="/assets/img/Star.png" />
                    <img src="/assets/img/Star.png" />
                  </VideoScoreDiv>
                )}
                {item.bestScore === null && (
                  <VideoScoreDiv>
                    <img src="/assets/img/EmptyStar.png" />
                    <img src="/assets/img/EmptyStar.png" />
                    <img src="/assets/img/EmptyStar.png" />
                  </VideoScoreDiv>
                )}
                <VideoAllRoleDiv>
                  {item.roles.map((item: any, index: number) => {
                    return (
                      <VideoRoleWrapDiv key={index}>
                        <VideoRoleDiv># {item}</VideoRoleDiv>
                      </VideoRoleWrapDiv>
                    );
                  })}
                </VideoAllRoleDiv>
              </EachBtn>
            );
          })}
        </ListWrapperDiv>
        {/* {testArray?.data?.length !== 0 && (
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
      </DoneWrapperDiv> */}
      </AllDiv>
    </AllWrapperDiv>
  );
};

export default VideoListPage;

// const StyledDiv = styled.div`
//   width: 4rem;
//   height: 4rem;
//   border-radius: 50%;
//   box-shadow: 0.3rem 0.3rem 0.6rem var(#c8d0e7),
//     -0.2rem -0.2rem 0.5rem var(#ffffff);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 2rem;
//   cursor: pointer;
//   color: var(#9baacf);
//   transition: all 0.5s ease;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: var(#e4ebf5);
//   &:active {
//     box-shadow: inset 0.2rem 0.2rem 0.5rem var(#c8d0e7),
//       inset -0.2rem -0.2rem 0.5rem var(#ffffff);
//     color: var(#6d5dfc);
//   }
//   &:hover {
//     color: var(#6d5dfc);
//   }
// `;

const AllWrapperDiv = styled.div`
  display: flex;
`;

const ListWrapperDiv = styled.div`
  display: flex;
  width: 100vw;
  padding: 5vw;
  flex-wrap: wrap;
  justify-content: space-between;
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

const StarDiv = styled.div`
  display: flex;
  position: absolute;
  top: 10vw;
  left: 7vw;
`;

const StarBtn = styled.button`
  display: flex;
  height: 100%;
  border-radius: 10px;
  margin-right: 5px;
  font-family: "CookieRun-Bold";
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  background: linear-gradient(-45deg, #fbf8cc, #fdf579, #fff125, #ffd761);

  transition: all 0.2s ease-in-out;
  padding: 5px 13px 5px 10px;
  &:hover {
    box-shadow: -2px -2px 5px #fff;
  }
`;

const StarImg = styled.image`
  height: 1.5vw;
  display: flex;
`;

const DoneSelectDiv = styled.div`
  display: flex;
  position: absolute;
  top: 10vw;
  right: 6.7vw;
`;
const DoneBtn = styled.div`
  display: flex;
  height: 100%;
  border-radius: 10px;
  margin-right: 5px;
  font-family: "CookieRun-Bold";
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  background: white;

  transition: all 0.2s ease-in-out;
  padding: 5px 13px 5px 10px;
  &:hover {
    box-shadow: -2px -2px 5px #fff;
  }
`;

const NotDoneBtn = styled.button`
  display: flex;
  height: 100%;
  border-radius: 10px;
  margin-right: 5px;
  font-family: "CookieRun-Bold";
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  background: white;

  transition: all 0.2s ease-in-out;
  padding: 5px 13px 5px 10px;
  &:hover {
    box-shadow: -2px -2px 5px #fff;
  }
`;

const DoneImg = styled.image`
  display: flex;
  height: 1.5vw;
`;

const NotDoneImg = styled.image`
  display: flex;
  height: 1.5vw;
`;

const SearchDiv = styled.div`
  display: flex;
  position: absolute;
  left: 7vw;
`;
const SearchInput = styled.input`
  display: flex;
  /* border: 1px solid; */
  padding: 2px;
  width: 86vw;
  border-radius: 10px;
  padding: 0.5vw 1vw 0.5vw 1vw;
  font-family: "PyeongChangPeace-Light";
  font-size: 1.5vw;
  box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
`;

const SearchIconBtn = styled.button`
  position: absolute;
  width: 2.5vw;
  right: 1vw;
  top: 0.35vw;
`;
const SelectDiv = styled.div`
  display: flex;
`;

const AllDiv = styled.div`
  display: grid;
  margin-top: 6vw;
`;

const EachBtn = styled.button`
  display: grid;
  position: relative;
  width: 27vw;
  height: 21vw;
  margin: 2vh;
  padding: 2vh;
  border-radius: 1vw;
  /* border: 1px solid; */
  box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #fbf8cc;
    border-bottom: 4px solid darken(#fbf8cc, 10%);
    &:before {
      transform: skewX(-45deg) translateX(13.5em);
      transition: all 0.5s ease-in-out;
    }
  }
`;

const VideoImg = styled.image`
  width: 24.8vw;
`;

const VideoTitleDiv = styled.div`
  display: flex;
  position: absolute;
  font-family: "ONE-Mobile-Title";
  font-size: 1.3vw;
  top: 16vw;
  left: 1.5vw;
`;

const VideoTimeDiv = styled.div`
  display: flex;
  position: absolute;
  top: 13.2vw;
  right: 1.3vw;
  padding: 5px 1vh 5px 1vh;
  /* background-color: white; */
  /* border: 1px solid; */
  border-radius: 5px;
  color: white;
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  font-family: "PyeongChangPeace-Light";
  font-weight: 900;
  font-size: 0.8vw;
`;

const VideoScoreDiv = styled.div`
  display: flex;
  position: absolute;
  justify-content: right;
  top: 1.2vw;
  right: 1.5vw;
  width: 1.5vw;
`;

const VideoAllRoleDiv = styled.div`
  display: flex;
  position: absolute;
  top: 18.5vw;
  left: 1.3vw;
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const VideoRoleWrapDiv = styled.div`
  display: flex;
  height: 100%;
  border-radius: 10px;
  margin-right: 5px;
  font-family: "CookieRun-Bold";
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  background: linear-gradient(-45deg, #fbf8cc, #fdf579, #fff125, #ffd761);
  animation: ${gradient} 15s ease infinite;
  transition: all 0.2s ease-in-out;
  padding: 5px 13px 5px 10px;
  &:hover {
    box-shadow: -2px -2px 5px #fff;
  }

  &:active {
    box-shadow: inset 1px 1px 2px
        linear-gradient(-45deg, #fbf8cc, #fdf579, #fff125, #ffd761),
      inset -1px -1px 2px #fff;
  }
`;

const VideoRoleDiv = styled.div`
  display: flex;
`;
