import React, { useState, useEffect } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { deleteUserAction } from "../../redux/modules/user";
import { Box, FormControl, Input, InputLabel } from "@mui/material";
import NickChangeModal from "../user/NickChangeModal";
import PasswordChangeModal from "../user/PasswordChangeModal";
import tw, { css, styled, theme } from "twin.macro";

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
    console.log(user.id);
    dispatch(deleteUserAction(user.id)).then(() =>
      navigate("/", { replace: true })
    );
    alert("회원 탈퇴 되었습니다.");
  };
  return (
    <AllDiv>
      <Box component="form" sx={boxStyle} noValidate autoComplete="off">
        <Box component="div" sx={boxStyle2}>
          <FormControl variant="standard">
            <InputLabel
              htmlFor="id"
              sx={{ fontFamily: "insungitCutelivelyjisu", fontSize: "1.5vw" }}
            >
              아이디
            </InputLabel>
            <Input
              id="id"
              value={user.id}
              disabled
              sx={{ fontFamily: "insungitCutelivelyjisu", fontSize: "1.5vw" }}
            ></Input>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ position: "relative", display: "inline-block" }}
          >
            <div style={{ float: "left" }}>
              <div
                style={{
                  float: "left",
                  height: "inherit",
                  paddingRight: "30px",
                }}
              >
                <InputLabel
                  htmlFor="nickName"
                  sx={{
                    fontFamily: "insungitCutelivelyjisu",
                    fontSize: "1.5vw",
                  }}
                >
                  닉네임
                </InputLabel>
                <Input
                  id="nickName"
                  value={user.nickName}
                  disabled
                  sx={{
                    fontFamily: "insungitCutelivelyjisu",
                    fontSize: "1.5vw",
                  }}
                ></Input>
              </div>
              <div>
                <StyledButton2
                  variant="contained"
                  onClick={onClickNickName}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "5vw",
                    height: "inherit",
                    border: "none",
                    // outline: "none",
                    cursor: "pointer",
                  }}
                >
                  닉네임 변경
                </StyledButton2>
              </div>
            </div>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              htmlFor="email"
              sx={{ fontFamily: "insungitCutelivelyjisu", fontSize: "1.5vw" }}
            >
              이메일
            </InputLabel>
            <Input
              id="email"
              value={user.email}
              disabled
              sx={{ fontFamily: "insungitCutelivelyjisu", fontSize: "1.5vw" }}
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
                // backgroundColor: "white",
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
    </AllDiv>
  );
};

export default AboutMe;

const buttonBoxStyle = {
  display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  gap: "3.5vw",
  marginTop: "15px",
  textAlign: "center",
};

const AllDiv = styled.div`
  width: 70vw;
  text-align: center;
  align-items: center;
  justify-content: center;
  /* margin-left: vw; */
  /* margin-top: 5vw; */
`;

const boxStyle = {
  "& .MuiFormControl-root": {
    m: 1,
    width: "30ch",
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
    fontFamily: "insungitCutelivelyjisu",
    fontSize: "1.5vw",
    textAlign: "center",
    // alignItems: "center",
  },
};

// 내정보 스타일
const boxStyle2 = {
  // display: "flex",
  transform: "translateX(-50%)",
  fontFamily: "insungitCutelivelyjisu",
  marginLeft: "45em",
};

// 탈퇴 버튼 스타일
const DeleteButton = muiStyled(Button)<ButtonProps>(({ theme }) => ({
  border: "none",
  backgroundColor: "#FBF8CC",
  color: "black",
  boxShadow: "none",
  fontFamily: "insungitCutelivelyjisu",
  fontSize: "1.5vw",
  padding: "6px 12px",
  width: "10vw",
  // left: "-3vw",
  // position: "absolute",
  // left: "vw",
  // top: "13vw",
  "&:hover": {
    backgroundColor: "white",
    borderColor: "#FBF8CC",
    boxShadow: "none",
    color: "#FFD761",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#FBF8CC",
    borderColor: "#FBF8CC",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));

// 버튼 스타일
const StyledButton = muiStyled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: "insungitCutelivelyjisu",
  fontSize: "1.5vw",
  backgroundColor: "#FFD761",
  color: "black",
  padding: "6px 12px",
  // border: "1px solid",
  width: "10vw",
  // position: "absolute",
  // left: "-5vw",
  // top: "13vw",
  // marginLeft: "vw",
  // left: "0.5vw",
  "&:hover": {
    backgroundColor: "#005112",
    borderColor: "#005112",
    boxShadow: "none",
    color: "#FFFFFF",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#005112",
    borderColor: "#005112",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));

// 닉네임 변경
const StyledButton2 = muiStyled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: "insungitCutelivelyjisu",
  fontSize: "1vw",
  backgroundColor: "#FFD761",
  color: "black",
  // padding: "6px 12px",
  border: "1px solid",
  // width: "20vw",
  position: "absolute",
  left: "19vw",
  // marginLeft: "vw",
  // left: "0.5vw",
  "&:hover": {
    backgroundColor: "#005112",
    borderColor: "#005112",
    boxShadow: "none",
    color: "#FFFFFF",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#005112",
    borderColor: "#005112",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));
const StyledInput = muiStyled(Input);
