import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "./InputWithLabel";
import { signinAction } from "../../redux/modules/user";
import { Box, FormControl } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const LoginBox = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);
  const users = useAppSelector((state) => state.user.userData);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value);
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signinAction({
        id: uid,
        password: pw,
      })
    ).then(() => {
      console.log(users.id);
      navigate("/");
    });
  };

  const goRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/register");
  };

  const handleClickShowPw = () => {
    setShowPw((prev) => !prev);
  };
  const handleMouseDownPw = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiFormControl-root": { m: 1, width: "25ch", display: "flex" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <Box component="div" sx={boxStyle2}>
        <InputWithLabel
          label="아이디"
          name="id"
          value={uid}
          placeholder="id"
          onChange={onChangeId}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          value={pw}
          placeholder="password"
          type="password"
          onChange={onChangePw}
        />
        <StyledButton variant="contained" type="submit">
          Log in
        </StyledButton>
        <StyledButton variant="contained" onClick={goRegister}>
          Sign up
        </StyledButton>
      </Box>
    </Box>
  );
};

export default LoginBox;

const boxStyle2 = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translateX(-50%)",
};

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
