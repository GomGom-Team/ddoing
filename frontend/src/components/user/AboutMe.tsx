import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { deleteUserAction } from "../../redux/modules/user";
import { Box, FormControl, Input, InputLabel } from "@mui/material";
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
      <Box component="div" sx={boxStyle2}>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="id"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            아이디
          </InputLabel>
          <Input
            id="id"
            value={user.id}
            disabled
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          ></Input>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ position: "relative", display: "inline-block" }}
        >
          <div style={{ float: "left" }}>
            <div
              style={{ float: "left", height: "inherit", paddingRight: "30px" }}
            >
              <InputLabel
                htmlFor="nickName"
                sx={{ fontFamily: "insungitCutelivelyjisu" }}
              >
                닉네임
              </InputLabel>
              <Input
                id="nickName"
                value={user.nickName}
                disabled
                sx={{ fontFamily: "insungitCutelivelyjisu" }}
              ></Input>
            </div>
            <div>
              <StyledButton
                variant="contained"
                onClick={onClickNickName}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "50px",
                  height: "inherit",
                  border: "none",
                  // outline: "none",
                  cursor: "pointer",
                }}
              >
                닉네임 변경
              </StyledButton>
            </div>
          </div>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="email"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            이메일
          </InputLabel>
          <Input
            id="email"
            value={user.email}
            disabled
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          ></Input>
        </FormControl>

        <Box component="div" sx={buttonBoxStyle}>
          <StyledButton variant="contained" onClick={onClickPw}>
            비밀번호 변경
          </StyledButton>
          <DeleteButton
            variant="contained"
            onClick={onDeleteUser}
            sx={{
              border: "none",
              backgroundColor: "white",
              color: "black",
              boxShadow: "none",
            }}
          >
            회원탈퇴
          </DeleteButton>
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
  textAlign: "center",
};

const boxStyle = {
  "& .MuiFormControl-root": {
    m: 1,
    width: "30ch",
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
    fontFamily: "insungitCutelivelyjisu",
    textAlign: "center",
  },
};

// 내정보 스타일
const boxStyle2 = {
  position: "absolute",
  left: "800px",
  top: "250px",
  transform: "translateX(-50%)",
  marginTop: "100px",
  fontFamily: "insungitCutelivelyjisu",
};

// 탈퇴 버튼 스타일
const DeleteButton = styled(Button)<ButtonProps>(({ theme }) => ({
  border: "none",
  backgroundColor: "white",
  color: "black",
  boxShadow: "none",
  fontFamily: "insungitCutelivelyjisu",
  padding: "6px 12px",
  width: "50%",
  "&:hover": {
    backgroundColor: "#005112",
    borderColor: "#005112",
    boxShadow: "none",
    color: "#FFFFFF",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));

// 버튼 스타일
const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: "insungitCutelivelyjisu",
  backgroundColor: "#FFD761",
  color: "black",
  padding: "6px 12px",
  border: "1px solid",
  width: "50%",
  "&:hover": {
    backgroundColor: "#005112",
    borderColor: "#005112",
    boxShadow: "none",
    color: "#FFFFFF",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));

const StyledInput = styled(Input);
