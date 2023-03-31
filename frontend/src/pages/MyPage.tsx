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
// }, [users]);

const MyPage = () => {
  const users = useAppSelector((state) => state.user.userData);
  const level = 0;
  return (
    <Container>
      {/* Header */}
      <Header />
      <DummyDiv></DummyDiv>
      <Profile>
        <CustomedImage src={`assets/img/ddio${level}.png`} />
        <ProfileName>{users.nickName}</ProfileName>
      </Profile>
      <LevelArea>
        <LevelStyle>Level {users.level}</LevelStyle>
        <div id="root"></div>
        <MultiColorProgressBar readings={readings} />
        {/* <CustomedBar /> */}
      </LevelArea>
      <Box sx={TabStyle}>
        <VerticalTabs></VerticalTabs>
      </Box>
      {/* Footer */}
      <Footer />
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
  margin-left: 5%;
  margin-top: 4%;
  border-radius: 70%;
`;

const Profile = styled.div`
  display: block;
  float: left;
  margin-left: 5%;
  margin-top: 4%;
  border-radius: 70%;
`;

const ProfileName = styled.span`
  display: block;
  text-align: center;
  /* margin-left: 40%; */
  margin-top: 120%;
  border-radius: 70%;
`;

const CustomedBar = styled.img(
  tw`h-4 object-cover rounded-md bg-slate-500`,
  css`
    width: 30rem;
    display: block;
    margin-left: 200px;
    padding-left: 600px;
  `
);

const TabStyle = {
  display: "flex",
  margin: "170px",
  // float: "left",
};

// level 글자
const LevelStyle = styled.div`
  display: "flex";
  width: 40rem;
  margin: 30px;
  padding-left: 200px;
`;

// level 영역
const LevelArea = styled.div`
  padding-left: 350px;
  margin-top: 10%;
`;

let readings: Reading[] = [
  {
    name: "EXP",
    value: 60,
    color: "#eb4d4b",
  },
  {
    name: "Blueberries",
    value: 30,
    color: "#22a6b3",
  },
  // {
  //   name: "Guavas",
  //   value: 23,
  //   color: "#6ab04c",
  // },
  // {
  //   name: "Grapes",
  //   value: 10,
  //   color: "#e056fd",
  // },
];
