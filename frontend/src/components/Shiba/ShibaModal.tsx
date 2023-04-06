import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import BasicModal from "../common/BasicModal";
import Threejs from "./Threejs";
import tw, { css, styled, theme } from "twin.macro";
import { changeUserAction } from "../../redux/modules/user";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";

const ShibaModal = ({ open, setOpen, name, level }: any) => {
  const user = useAppSelector((state) => state.user.userData);
  const [bgColor, setBgColor] = useState("white");
  const [profile, setProfile] = useState<string>("Basic_1");
  const dispatch = useAppDispatch();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "75vh",
    bgcolor: bgColor,
    // border: "4px solid #9A7946",
    // boxShadow: 24,
    p: 2,
    borderRadius: 10,
  };

  const changeShiba = () => {
    console.log(user.id, profile);
    dispatch(changeUserAction({ id: user.id, profile: profile })).then(() => {
      onCloseModal();
    });
  };
  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };
  console.log(user);

  useEffect(() => {
    if (level === 1) setBgColor("#cfb893");
    if (level === 2) setBgColor("#c5c5c5");
    if (level === 3) setBgColor("#2e2e2e");
    if (level === 4) setBgColor("#ddce77");
    if (level === 5) setBgColor("#260a41");
    if (level === 6) setBgColor("#63aff7");
    if (level === 7) setBgColor("#28b1e7");
    if (level === 8) setBgColor("#333333");
    if (level === 9) setBgColor("#57cc4c");
    if (level === 10) setBgColor("#eb90eb");
    if (level === 11) setBgColor("#6a8096");
    if (level === 12) setBgColor("#fff894");
    if (level === 13) setBgColor("#000000");
    if (level === 14) setBgColor("#641010");
    if (level === 15) setBgColor("#ffffff");
    setProfile(name + "_" + String(level));
  }, []);

  console.log("profile", profile);
  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Box component="div" sx={style}>
        <Threejs name={name} level={level} />
        <StyledBtn onClick={() => changeShiba()}>선택</StyledBtn>
      </Box>
    </BasicModal>
  );
};

export default ShibaModal;

const buttonBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  marginTop: "15px",
};

const StyledBtn = styled.button`
  width: 15vw;
  font-size: 2vw;
  padding-left: 3vw;
  padding-right: 3vw;
  position: absolute;
  left: 17.5vw;
  top: 30.5vw;
  background-color: beige;
  border-radius: 1vw;
  font-family: "CookieRun-Bold";
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);
  &:active {
    box-shadow: 2px 4px 4px hsl(0deg 0% 0% / 0.25);
  }
`;
