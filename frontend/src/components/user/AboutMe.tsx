import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { deleteUserAction } from "../../redux/modules/user";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import NickChangeModal from "../user/NickChangeModal";
import PasswordChangeModal from "../user/PasswordChangeModal";

const AboutMe = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  const [openNickNameModal, setOpenNickNameModal] = useState<boolean>(false);
  const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);

  const onClickPw = () => {
    setOpenPasswordModal((prev) => !prev);
  };
  const onClickNickName = () => {
    setOpenNickNameModal((prev) => !prev);
  };
  const onDeleteUser = () => {
    dispatch(deleteUserAction());
    navigate("/", { replace: true });
  };
  return (
    <Box component="form" sx={boxStyle} noValidate autoComplete="off">
      <Box sx={boxStyle2}>
        <FormControl variant="standard">
          <InputLabel htmlFor="id">ID</InputLabel>
          <Input id="id" value={user.id} disabled></Input>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="nickName">NICKNAME</InputLabel>
          <Input id="nickName" value={user.nickName} disabled></Input>
          <Button variant="contained" onClick={onClickNickName}>
            닉네임 변경
          </Button>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="email">EMAIL</InputLabel>
          <Input id="email" value={user.email} disabled></Input>
        </FormControl>

        <Box sx={buttonBoxStyle}>
          <Button variant="contained" onClick={onClickPw}>
            비밀번호 변경
          </Button>
          <Button variant="contained" onClick={onDeleteUser}>
            회원탈퇴
          </Button>
        </Box>
      </Box>
      {/* 닉네임 변경 모달 */}
      {openNickNameModal && (
        <NickChangeModal
          open={openNickNameModal}
          setOpen={setOpenNickNameModal}
          // setOpenAlert={setOpenAlert}
          // openAlert={openAlert}
        />
      )}

      {/* 비밀번호 변경 모달 */}
      {openPasswordModal && (
        <PasswordChangeModal
          open={openPasswordModal}
          setOpen={setOpenPasswordModal}
          // setOpenAlert={setOpenAlert}
          // openAlert={openAlert}
        />
      )}
    </Box>
  );
};

export default AboutMe;

const buttonBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  marginTop: "15px",
};

const boxStyle = {
  "& .MuiFormControl-root": {
    m: 1,
    width: "30ch",
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
};

// 내정보 스타일
const boxStyle2 = {
  position: "absolute",
  left: "50%",
  top: "20%",
  transform: "translateX(-50%)",
  marginTop: "15%",
};

// 닉네임 버튼 스타일
const NickButtonStyle = {};
