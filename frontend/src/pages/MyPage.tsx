import React, { useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import VerticalTabs from "../components/user/LeftVerticalTab";
import { Container, Header, Footer } from "../components/common/index";
import { Box } from "@mui/material";
import { useAppSelector } from "../redux/configStore.hooks";
import MultiColorProgressBar from "../components/user/LevelBar";
import user from "../redux/modules/user";

interface Reading {
  name: string;
  value: number;
  color: string;
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
      value: exp === null ? 0 : exp,
      color: "#eb4d4b",
    },
    {
      name: "Blueberries",
      value: exp === null ? 100 : 100 - exp,
      color: "#22a6b3",
    },
  ];

  return (
    <Container>
      {/* Header */}
      <FontStyle>
        <Header />
        <DummyDiv></DummyDiv>
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
        <Box component="div" sx={TabStyle}>
          <VerticalTabs></VerticalTabs>
        </Box>
        {/* Footer */}
        <Footer />
      </FontStyle>
    </Container>
  );
};

// style
const DummyDiv = styled.div(tw`h-16`);

export default MyPage;

//프로필사진
// tw`h-52 object-cover rounded-md bg-slate-500`,
const CustomedImage = styled.img`
  width: 10rem;
  height: 10rem;
  display: block;
  float: left;
  margin-left: 50px;
  margin-top: 30px;
  border-radius: 70%;
`;

const Profile = styled.div`
  display: block;
  float: left;
  margin-left: 70px;
  margin-top: 40px;
  border-radius: 70%;
`;

const ProfileName = styled.span`
  display: block;
  text-align: center;
  margin-left: 40px;
  margin-top: 120px;
  border-radius: 70%;
`;

const TabStyle = {
  display: "flex",
  margin: "170px",
  // float: "left",
};

// level 글자
const LevelStyle = styled.div`
  display: "flex";
  width: 40rem;
  margin: 25px;
  padding-left: 150px;
  font-size: 50px;
`;

// level 영역
const LevelArea = styled.div`
  padding-left: 350px;
  margin-top: 70px;
`;

const FontStyle = styled.div`
  font-family: "insungitCutelivelyjisu";
`;
