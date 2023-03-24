import React, { useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import InputWithLabel from "./InputWithLabel";
import { signinAction } from "../../redux/modules/user";
import { Box, Button, FormControl } from "@mui/material";
import { useAppDispatch } from "../../redux/configStore.hooks";

const LoginBox = () => {
  const dispatch = useAppDispatch();
  const [uid, setUid] = useState<string>("");
  const [pw, setPw] = useState<string>("");

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
    );
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
      <Button variant="contained" type="submit">
        로그인
      </Button>
    </Box>
  );
};

export default LoginBox;
