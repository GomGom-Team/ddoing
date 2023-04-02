import { CheckRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import {
  changeNickAction,
  checkNickNameAction,
} from "../../redux/modules/user";
import BasicModal from "../common/BasicModal";

function NickChangeModal({ open, setOpen }: any): JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const checkDupNick = useAppSelector((state) => state.user.checkNickName);
  const dispatch = useAppDispatch();

  const [nickName, setNickName] = useState<string>(user.nickName);
  const [nickNameActivated, setNickNameActivated] = useState<boolean>(false);
  const [nickNameCheck, setNickNameCheck] = useState<string>("PleaseCheck");

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      setNickName(e.target.value);
      setNickNameActivated(true);
    }
  };

  const onConfirmNickName = () => {
    dispatch(checkNickNameAction(nickName));
  };

  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nickNameActivated || (nickNameActivated && nickNameCheck)) {
      dispatch(
        changeNickAction({
          id: user.id,
          nickName,
        })
      ).then(() => {
        setNickName(nickName);
        onCloseModal();
      });
    }

    // onCloseModal();
    // navigate("/main", { replace: true });
  };

  useEffect(() => {
    if (checkDupNick.error) {
      setNickNameCheck("UnAvailable");
    } else if (checkDupNick.data) {
      setNickNameCheck("Available");
    }
  }, [checkDupNick]);

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Box
        component="form"
        sx={{
          "& .MuiFormControl-root": { m: 1, width: "25ch", display: "flex" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <h2 id="parent-modal-title">닉네임 변경</h2>
        <FormControl variant="standard">
          <InputLabel htmlFor="nickName">새 닉네임</InputLabel>
          <Input
            id="nickName"
            value={nickName}
            onChange={onChangeNickName}
            aria-describedby="nick-helper-text"
            required
            error={nickNameActivated && nickName === "" ? true : false}
          />
          <FormHelperText id="nick-helper-text">
            {nickNameActivated &&
              (nickNameCheck === "Available" ? (
                <span>사용 가능한 닉네임입니다</span>
              ) : nickNameCheck === "UnAvailable" ? (
                <span>이미 사용중인 닉네임입니다</span>
              ) : (
                <span>닉네임 중복 체크를 해주세요</span>
              ))}
          </FormHelperText>
        </FormControl>
        <Button
          onClick={onConfirmNickName}
          disabled={!nickNameActivated || user.nickName === nickName}
        >
          닉네임 중복 확인
        </Button>
        <Box component="div" sx={buttonBoxStyle}>
          <Button variant="contained" type="submit">
            변경
          </Button>
          <Button variant="contained" onClick={onCloseModal}>
            취소
          </Button>
        </Box>
      </Box>
    </BasicModal>
  );
}
export default NickChangeModal;

const buttonBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  marginTop: "15px",
};

const checkBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
