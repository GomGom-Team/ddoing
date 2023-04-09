import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/configStore.hooks";
import { styled } from "twin.macro";
import { keyframes } from "styled-components";
import { Header } from "../components/common";
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
  // Navigate
  const navigate = useNavigate();
  // User 데이터 불러오기
  const user = useAppSelector((state) => state.user.userData);
  // inpuyData - 현재 입력값을 담아줌
  const [inputData, setInputData] = useState("");
  // Test Array - 재 요구하는 요청의 리스트를 담아줌
  const [testArray, setTestArray] = useState<any>(null);
  // 3Star Animation List
  const [myStar3List, setMyStar3List] = useState<VideoListType[] | null>(null);
  // 2Star Animation List
  const [myStar2List, setMyStar2List] = useState<VideoListType[] | null>(null);
  // 1Star Animation List
  const [myStar1List, setMyStar1List] = useState<VideoListType[] | null>(null);
  // Done Animation List
  const [myDoneList, setMyDoneList] = useState<VideoListType[] | null>(null);
  // Not Done Animation List
  const [myNotDoneList, setMyNotDoneList] = useState<VideoListType[] | null>(
    null
  );
  // Search Animation List
  const [mySearchList, setMySearchList] = useState<VideoListType[] | null>(
    null
  );
  // All Animation List
  const [videoList, setVideoList] = useState<VideoListType[] | null>(null);

  // 현재 입력중인 값을 inputData에 업데이트
  const changeInputData = (e: any) => {
    setInputData(e.target.value);
  };

  // 검색 시 enter를 눌렀을 때, searchListHandler 실행
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && inputData !== "") {
      searchListHandeler();
    }
  };

  // handleClick : status에 따라 testArray에 해당 리스트를 넣어줌
  // list가 null인 경우, 빈 배열 반환
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
    } else if (status === "All") {
      if (videoList !== null) {
        setTestArray(videoList);
      } else {
        setTestArray([]);
      }
    }
  };

  // GET 3Star Animation List
  const star3ListHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/star/${user.id}/3`)
      .then((res) => {
        // console.log(res.data);
        setMyStar3List(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET 2Star Animation List
  const star2ListHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/star/${user.id}/2`)
      .then((res) => {
        // console.log(res.data);
        setMyStar2List(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET 1Star Animation List
  const star1ListHandler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/star/${user.id}/1`)
      .then((res) => {
        // console.log(res.data);
        setMyStar1List(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET Done Animation List
  const doneListHandeler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/${user.id}/1`)
      .then((res) => {
        // console.log(res.data);
        setMyDoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET Not Done Animation List
  const notDoneListHandeler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/filter/${user.id}/0`)
      .then((res) => {
        // console.log(res.data);
        setMyNotDoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET Search Animation List
  const searchListHandeler = async () => {
    await axios
      .get(
        `https://j8a103.p.ssafy.io/api/animations/search/${inputData}/${user.id}`
      )
      .then((res) => {
        // console.log(res.data);
        setMySearchList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET All Animation List
  const videoListHandeler = async () => {
    await axios
      .get(`https://j8a103.p.ssafy.io/api/animations/${user.id}`)
      .then((res) => {
        // console.log(res.data);
        setVideoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // api : 모든 Handeler 실행
  const api = async () => {
    videoListHandeler();
    star1ListHandler();
    star2ListHandler();
    star3ListHandler();
    doneListHandeler();
    notDoneListHandeler();
    searchListHandeler();
  };

  // 페이지 로딩시 실행
  useEffect(() => {
    // 미로그인 상태일 때, 로그인 페이지로 이동
    if (!user.id) {
      navigate("/login");
    }
    // 전체 Handeler 실행
    api();
  }, []);

  // testArray가 변경될 경우, testArray에 값을 넣어줌
  useEffect(() => {
    setTestArray(testArray);
  }, [testArray]);

  // mySearchList가 변경될 경우, testArray에 mySearchList를 넣어줌
  useEffect(() => {
    setTestArray(mySearchList);
  }, [mySearchList]);

  return (
    <AllWrapperDiv>
      <Header />
      <AllDiv>
        <SelectDiv>
          <StarDiv>
            {/* 별 3개 클릭시 */}
            <StarBtn
              onClick={() => {
                handleClick("Star3");
              }}
            >
              <StarImg>
                <img src="/assets/img/Star.png" />
                <img src="/assets/img/Star.png" />
                <img src="/assets/img/Star.png" />
              </StarImg>
            </StarBtn>
            {/* 별 2개 클릭시 */}
            <StarBtn
              onClick={() => {
                handleClick("Star2");
              }}
            >
              <StarImg>
                <img src="/assets/img/Star.png" />
                <img src="/assets/img/Star.png" />
              </StarImg>
            </StarBtn>
            {/* 별 1개 클릭시 */}
            <StarBtn
              onClick={() => {
                handleClick("Star1");
              }}
            >
              <StarImg>
                <img src="/assets/img/Star.png" />
              </StarImg>
            </StarBtn>
          </StarDiv>
          <DoneSelectDiv>
            {/* All 클릭시 */}
            <AllSelectBtn
              onClick={() => {
                handleClick("All");
              }}
            >
              <NotDoneDiv>All</NotDoneDiv>
            </AllSelectBtn>
            {/* Done 클릭시 */}
            <DoneBtn
              onClick={() => {
                handleClick("Done");
              }}
            >
              <DoneImg>
                <img src="/assets/img/Done.png" />
                <DoneDiv>Done</DoneDiv>
              </DoneImg>
            </DoneBtn>
            {/* Not Done 클릭시 */}
            <NotDoneBtn
              onClick={() => {
                handleClick("NotDone");
              }}
            >
              <NotDoneImg>
                <img src="/assets/img/NotDone.png" />
                <NotDoneDiv>Not Done</NotDoneDiv>
              </NotDoneImg>
            </NotDoneBtn>
          </DoneSelectDiv>
          {/* 검색시 */}
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
            {/* 아무 버튼도 클릭하지 않았을 경우 */}
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
                  {/* 별 개수 표시 */}
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
                  <VideoBigTitleDiv>
                    {item.title.split("(")[0]}
                  </VideoBigTitleDiv>
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
            {/* 특정 버튼을 클릭하여 그에 맞는 리스트가 testArray에 들어있다면 */}
            {testArray &&
              testArray?.map((item: any, index: number) => {
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
                    {/* 별 개수 표시 */}
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
  align-items: center;
`;

const DoneDiv = styled.div`
  font-family: "PyeongChangPeace-Bold";
  font-size: 1vw;
  margin-left: 0.5vw;
  margin-right: 0.25vw;
`;

const NotDoneDiv = styled.div`
  font-family: "PyeongChangPeace-Bold";
  font-size: 1vw;
  margin-left: 0.5vw;
  margin-right: 0.25vw;
`;

const ListWrapperDiv = styled.div`
  display: flex;
  padding: 7.5vw 10vw 7.5vw 10vw;
  flex-wrap: wrap;
  justify-content: center;
`;

const VideoBigTitleDiv = styled.div`
  position: absolute;
  top: 1.3vw;
  left: 2vw;
  font-family: "ONE-Mobile-POP";
  font-size: 1vw;
  color: white;
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
const DoneBtn = styled.button`
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

const AllSelectBtn = styled.button`
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
  width: 22.5vw;
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
  /* width: 25vw; */
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
  flex-wrap: wrap;
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
  /* height: 100%; */
  border-radius: 10px;
  margin-right: 5px;
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  background: linear-gradient(-45deg, #fbf8cc, #fdf579, #fff125, #ffd761);
  animation: ${gradient} 15s ease infinite;
  transition: all 0.2s ease-in-out;
  padding: 5px 13px 5px 10px;
  &:active {
    box-shadow: inset 1px 1px 2px
        linear-gradient(-45deg, #fbf8cc, #fdf579, #fff125, #ffd761),
      inset -1px -1px 2px #fff;
  }
`;

const VideoRoleDiv = styled.div`
  display: flex;
  font-family: "CookieRun-Bold";
  font-size: 0.75vw;
`;
