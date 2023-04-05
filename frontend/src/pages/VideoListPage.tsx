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
import axios from "axios";

interface VideoListType {
  id: number;
  title: string;
  runningTime: number;
  pathUrl: string;
  bestScore: number | null;
  roles: string[];
}

const VideoListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const starList = ["선택", 1, 2, 3];
  const [selectedStar, setSelectedStar] = useState(0);
  const [selectedDone, setSelectedDone] = useState(-1);
  const user = useAppSelector((state) => state.user.userData);
  const [testArray, setTestArray] = useState<any>(null);
  // 새로운 것들
  // 별 3개 리스트
  const [myStar3List, setMyStar3List] = useState<VideoListType[] | null>(null);
  const [myStar2List, setMyStar2List] = useState<VideoListType[] | null>(null);
  const [myStar1List, setMyStar1List] = useState<VideoListType[] | null>(null);
  const [myDoneList, setMyDoneList] = useState<VideoListType[] | null>(null);
  const [myNotDoneList, setMyNotDoneList] = useState<VideoListType[] | null>(
    null
  );
  const [mySearchList, setMySearchList] = useState<VideoListType[] | null>(
    null
  );

  const [videoList, setVideoList] = useState<VideoListType[] | null>(null);
  const changeInputData = (e: any) => {
    setInputData(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && inputData !== "") {
      searchListHandeler();
    }
  };

  const handleClick = (status: string) => {
    if (status === "Star3") {
      if (myStar3List !== null) {
        setTestArray(myStar3List);
      } else {
        setTestArray([]);
      }
    } else if (status === "Star2") {
      if (myStar2List !== null) {
        setTestArray(myStar2List);
      } else {
        setTestArray([]);
      }
    } else if (status === "Star1") {
      if (myStar1List !== null) {
        setTestArray(myStar1List);
      } else {
        setTestArray([]);
      }
    } else if (status === "Done") {
      if (myDoneList !== null) {
        setTestArray(myDoneList);
      } else {
        setTestArray([]);
      }
    } else if (status === "NotDone") {
      if (myNotDoneList !== null) {
        setTestArray(myNotDoneList);
      } else {
        setTestArray([]);
      }
    }
    console.log("now status is ", status);
  };

  useEffect(() => {
    setTestArray(testArray);
  }, [testArray]);

  useEffect(() => {
    setTestArray(mySearchList);
  }, [mySearchList]);

  console.log("test", testArray);

  // const videoList = useAppSelector((state) => state.animation.getAnimationList);

  console.log("videoList!!!!!!", videoList);
  const star3ListHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/star/${user.id}/3`)
      .then((res) => {
        console.log(res.data);
        setMyStar3List(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const star2ListHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/star/${user.id}/2`)
      .then((res) => {
        console.log(res.data);
        setMyStar2List(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const star1ListHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/star/${user.id}/1`)
      .then((res) => {
        console.log(res.data);
        setMyStar1List(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doneListHandeler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/${user.id}/1`)
      .then((res) => {
        console.log(
          `https://j8a103.p.ssafy.io/api/animations/filter/${user.id}/1`
        );
        console.log(res.data);
        setMyDoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notDoneListHandeler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/${user.id}/0`)
      .then((res) => {
        console.log(res.data);
        setMyNotDoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchListHandeler = async () => {
    await axios
      .get(
        `https://j8a103.p.ssafy.io/api/animations/search/${inputData}/${user.id}`
      )
      .then((res) => {
        console.log(res.data);
        setMySearchList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const videoListHandeler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/${user.id}`)
      .then((res) => {
        console.log(res.data);
        setVideoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const api = async () => {
    videoListHandeler();
    star1ListHandler();
    star2ListHandler();
    star3ListHandler();
    doneListHandeler();
    notDoneListHandeler();
    searchListHandeler();
  };

  useEffect(() => {
    api();
  }, []);

  return (
    <AllWrapperDiv>
      <Header />
      <AllDiv>
        <SelectDiv>
          <StarDiv>
            <StarBtn
              onClick={() => {
                setSelectedStar(3);
                handleClick("Star3");
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
                handleClick("Star2");
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
                handleClick("Star1");
              }}
            >
              <StarImg>
                <img src="/assets/img/Star.png" />
              </StarImg>
            </StarBtn>
          </StarDiv>
          <DoneSelectDiv>
            <DoneBtn
              onClick={() => {
                setSelectedDone(1);
                handleClick("Done");
              }}
            >
              <DoneImg>
                <img src="/assets/img/Done.png" />
              </DoneImg>
            </DoneBtn>
            <NotDoneBtn
              onClick={() => {
                setSelectedDone(0);
                handleClick("NotDone");
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

        {testArray === null ? (
          <ListWrapperDiv>
            {videoList?.map((item: any, index: number) => {
              return (
                <EachBtn
                  key={index}
                  onClick={() => navigate(`/video/${item.id}`)}
                >
                  <>
                    <VideoDiv>
                      <VideoImg
                        src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
                      />
                    </VideoDiv>
                  </>
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
        ) : (
          <ListWrapperDiv>
            {testArray?.map((item: any, index: number) => {
              return (
                <EachBtn
                  key={index}
                  onClick={() => navigate(`/video/${item.id}`)}
                >
                  <VideoDiv>
                    <VideoImg
                      src={`https://img.youtube.com/vi/${item.pathUrl}/maxresdefault.jpg`}
                    />
                  </VideoDiv>
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
        )}
      </AllDiv>
    </AllWrapperDiv>
  );
};

export default VideoListPage;

const AllWrapperDiv = styled.div`
  display: flex;
`;

const ListWrapperDiv = styled.div`
  display: flex;
  width: 100vw;
  padding: 7.5vw 10vw 7.5vw 10vw;
  flex-wrap: wrap;
  justify-content: left;
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
  top: 11vw;
  left: 12vw;
`;

const StarBtn = styled.button`
  display: flex;
  height: 100%;
  border-radius: 10px;
  margin-right: 5px;
  font-family: "CookieRun-Bold";
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  /* background: linear-gradient(-45deg, #fbf8cc, #fdf579, #fff125, #ffd761); */

  /* transition: all 0.2s ease-in-out; */
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
  top: 11vw;
  right: 13vw;
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

const VideoImg = styled.img`
  border-radius: 1vw;
  width: 22.8vw;
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
  left: 35vw;
`;
const SearchInput = styled.input`
  display: flex;
  /* border: 1px solid; */
  padding: 2px;
  width: 30vw;
  border-radius: 1vw;
  padding: 0.5vw 1vw 0.5vw 1vw;
  font-family: "PyeongChangPeace-Light";
  font-weight: 900;
  font-size: 1.5vw;
  border: 3px solid;
  border-color: #c5c5c5;
  /* box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25); */
`;

const SearchIconBtn = styled.button`
  position: absolute;
  width: 2vw;
  right: 1vw;
  top: 0.7vw;
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
  width: 25vw;
  height: 21vw;
  margin: 0.5vw;
  padding: 1.25vw;
  border-radius: 1vw;
  border: 1px #d8d8d8;
  /* box-shadow: 2px 4px 4px hsl(0deg 0% 0% / 0.25); */
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

const VideoDiv = styled.div`
  width: 24.8vw;
  border-radius: 1vw;
`;

const VideoTitleDiv = styled.div`
  display: flex;
  position: absolute;
  font-family: "ONE-Mobile-Title";
  font-size: 1.3vw;
  top: 14.5vw;
  left: 1.5vw;
`;

const VideoTimeDiv = styled.div`
  display: flex;
  position: absolute;
  top: 12.2vw;
  right: 1.6vw;
  padding: 5px 1vh 5px 1vh;
  /* background-color: white; */
  /* border: 1px solid; */
  border-radius: 5px;
  color: white;
  /* box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25); */
  font-family: "PyeongChangPeace-Light";
  font-weight: 900;
  font-size: 0.8vw;
`;

const VideoScoreDiv = styled.div`
  display: flex;
  position: absolute;
  justify-content: right;
  top: 1.3vw;
  right: 1.8vw;
  width: 1.5vw;
`;

const VideoAllRoleDiv = styled.div`
  display: flex;
  position: absolute;
  top: 17vw;
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
  font-size: 0.75vw;
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
