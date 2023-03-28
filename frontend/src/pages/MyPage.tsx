import React, { useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";
import VerticalTabs from "../components/user/LeftVerticalTab";
import { Container, Header, Footer } from "../components/common/index";
import { Box } from "@mui/material";
import { useAppSelector } from "../redux/configStore.hooks";

const MyPage = () => {
  const user = useAppSelector((state) => state.user.userData);
  return (
    <Container>
      {/* Header */}
      <Header />
      <DummyDiv></DummyDiv>
      <Profile>
        <CustomedImage />
        <ProfileName>{user.id}</ProfileName>
      </Profile>
      <LevelArea>
        <LevelStyle>Level {user.level}</LevelStyle>
        <CustomedBar />
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
const CustomedImage = styled.img(
  tw`h-52 object-cover rounded-md bg-slate-500`,
  css`
    width: 10rem;
    height: 10rem;
    display: block;
    float: left;
    margin-left: 5%;
    margin-top: 4%;
    border-radius: 70%;
  `
);

const Profile = styled.div`
  display: block;
  float: left;
  margin-left: 5%;
  margin-top: 4%;
  border-radius: 70%;
`;

const ProfileName = styled.span`
  display: block;
  margin-left: 38%;
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
