import React, { useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import InputWithLabel from "./InputWithLabel";
import { signinAction } from "../../redux/modules/user";
import { Box, Button, FormControl } from "@mui/material";
import { useAppDispatch } from "../../redux/configStore.hooks";
import { Provider } from "react-redux";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [uid, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
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

export default LoginPage;

const LoginForm = styled.div(tw`mb-6`);

const LoginLabel = styled.label(
  tw`block mb-2 text-sm font-medium text-gray-900 dark:text-white`
);

const LoginInput = styled.input(
  tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
);
