import React, { useState } from "react";
import { useAppDispatch } from "../../redux/configStore.hooks";
import { signupAction } from "../../redux/modules/user";
import { Box, Button } from "@mui/material";
import InputWithLabel from "./InputWithLabel";

const RegisterBox = () => {
  const dispatch = useAppDispatch();

  const [uid, setUid] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value);
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const onChangePwCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwCheck(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signupAction({
        id: uid,
        password: pw,
        email: email,
        nickName: nickName,
        name: name,
      })
    );
    console.log("회원가입 완뇨^^");
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
      <InputWithLabel
        label="비밀번호확인"
        name="passwordCheck"
        value={pwCheck}
        placeholder="password"
        type="password"
        onChange={onChangePwCheck}
      />
      <InputWithLabel
        label="이메일"
        name="email"
        value={email}
        placeholder="email"
        onChange={onChangeEmail}
      />
      <InputWithLabel
        label="비밀번호"
        name="nickName"
        value={nickName}
        placeholder="nickName"
        type="nickName"
        onChange={onChangeNickName}
      />
      <InputWithLabel
        label="이름"
        name="nema"
        value={name}
        placeholder="name"
        type="name"
        onChange={onChangeName}
      />
      <Button variant="contained" type="submit">
        회원가입
      </Button>
    </Box>
  );
};

export default RegisterBox;
