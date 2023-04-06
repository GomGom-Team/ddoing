import React, { useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import VerticalTabs from "../components/user/LeftVerticalTab";
import { Container, Header, Footer } from "../components/common/index";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import MultiColorProgressBar from "../components/user/LevelBar";
import { useNavigate } from "react-router-dom";

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
  const users = useAppSelector((state) => state.user.userData);
  const level = 0;
  const exp = useAppSelector((state) => state.user.userData.exp);

  let readings: Reading[] = [
    {
      name: "EXP",
      value: exp === null ? 0 : Math.round(exp / 2),
      color: "#FFD761",
    },
    {
      name: "Blueberries",
      value: exp === null ? 100 : 100 - Math.round(exp / 2),
      color: "#d6d6d6",
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.id) {
      navigate("/login");
    }
  }, []);

  console.log(users);

  return (
    <ContaineDiv>
      {/* Header */}
      <Header />
      <DummyDiv></DummyDiv>
      <FontStyle>
        <ProfileDiv>
        <DummyDiv2></DummyDiv2>
          <ProfileWrapper>
            <Profile>
              <CustomedImage
                src={`assets/img/shiba/Shiba_${users.profile}.png`}
              />
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
const DummyDiv = styled.div(tw`h-20`);
const DummyDiv2 = styled.div(tw`h-56`);

//프로필사진
// tw`h-52 object-cover rounded-md bg-slate-500`,
const ContaineDiv = styled.div(
  tw``,
  css`
    width: 100%;
    height: 100%;
  `
);

const ProfileDiv = styled.div(
  tw`flex items-center content-between `,
  css`
    width: 100%;
    height: 30%;
  `
);

const ProfileWrapper = styled.div(
  tw`flex`,
  css`
    height: 100%;
    width: 100%;
  `
);

const BoxContentDiv = styled.div(
  tw``,
  css`
    height: 70%;
    width: 100%;
  `
);

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
    width: 20%;
  `
);

const ProfileName = styled.span(
  tw`text-3xl pt-10`,
  css`
    display: block;
    text-align: center;
    border-radius: 70%;
  `
);

const TabStyle = {
  display: "flex",
  height: "100%",
  width: "100%",
  flexDirection: "column",
};

// level 글자
const LevelStyle = styled.div`
  display: "flex";
  text-align: center;
  font-size: 50px;
`;

// level 영역
const LevelArea = styled.div(
  tw`flex flex-col pt-12`,
  css`
    width: 100%;
    height: 100%;
  `
);
const FontStyle = styled.div(
  tw``,
  css`
    font-family: "insungitCutelivelyjisu";
    height: 100%;
  `
);
