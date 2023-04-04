import React from "react";
import tw, { css, styled, theme } from "twin.macro";
import VerticalTabs from "../components/user/LeftVerticalTab";
import { Container, Header, Footer } from "../components/common/index";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import MultiColorProgressBar from "../components/user/LevelBar";

interface Reading {
  name: string;
  value: number;
  color: string;
}

interface DrawingListType {
  userId: string;
  drawingPath: string;
  percentage: number;
  word: string;
  mean: string;
}
// const [level, setLevel] = useState<number>(users.level);
// const [exp, setExp] = useState<number>(users.exp);

// useEffect(() => {
//   setLevel(users.level);
//   setExp(users.exp);
// }, [users]);\

const MyPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.userData);
  const level = 0;
  const exp = useAppSelector((state) => state.user.userData.exp);

  let readings: Reading[] = [
    {
      name: "EXP",
      value: exp === null ? 0 : Math.round(exp / 2),
      color: "#eb4d4b",
    },
    {
      name: "Blueberries",
      value: exp === null ? 100 : 100 - Math.round(exp / 2),
      color: "#22a6b3",
    },
  ];

  return (
    <ContaineDiv>
      {/* Header */}
      <FontStyle>
        <Header />
        <DummyDiv></DummyDiv>
        <DummyDiv2 />
        <ProfileDiv>
          <ProfileWrapper>
            <Profile>
              <CustomedImage src={`assets/img/ddio${level}.png`} />
              <ProfileName>{users.nickName} 님</ProfileName>
            </Profile>
            <LevelArea>
              <LevelStyle>Level {users.level}</LevelStyle>
              <div id="root"></div>
              <MultiColorProgressBar readings={readings} />
              {/* <CustomedBar /> */}
            </LevelArea>
          </ProfileWrapper>
        </ProfileDiv>
        <BoxContentDiv>
          <Box component="div" sx={TabStyle}>
            <VerticalTabs />
          </Box>
        </BoxContentDiv>
      </FontStyle>
    </ContaineDiv>
  );
};

export default MyPage;
// style
const DummyDiv = styled.div(tw`h-16`);
const DummyDiv2 = styled.div(tw`h-12`);

//프로필사진
// tw`h-52 object-cover rounded-md bg-slate-500`,
const ContaineDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const ProfileDiv = styled.div(
  tw`flex items-center h-2/6 content-between`,
  css`
    width: 100vw;
  `
);

const ProfileWrapper = styled.div(
  tw`flex`,
  css`
    height: 40vh;
  `
);

const BoxContentDiv = styled.div`
  height: 60vh - 6rem;
`;

const CustomedImage = styled.img`
  width: 10rem;
  height: 10rem;
  display: flex;
  float: left;
  border-radius: 70%;
`;

const Profile = styled.div(
  tw`flex flex-col items-center rounded-sm`,
  css`
    width: 30vw;
  `
);

const ProfileName = styled.span`
  display: block;
  text-align: center;
  border-radius: 70%;
`;

const TabStyle = {
  display: "flex",
  height: "20rem",
};

// level 글자
const LevelStyle = styled.div`
  display: "flex";
  /* width: 40rem; */
  padding-left: 100px;
  font-size: 50px;
`;

// level 영역
const LevelArea = styled.div`
  width: 70vw;
`;

const FontStyle = styled.div`
  font-family: "insungitCutelivelyjisu";
`;
