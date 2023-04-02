import { CheckRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
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
        <h2
          id="parent-modal-title"
          style={{
            fontFamily: "insungitCutelivelyjisu",
            marginBottom: "10%",
            fontSize: "25px",
          }}
        >
          닉네임 변경하기
        </h2>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="nickName"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            새 닉네임
          </InputLabel>
          <Input
            id="nickName"
            value={nickName}
            onChange={onChangeNickName}
            aria-describedby="nick-helper-text"
            required
            error={nickNameActivated && nickName === "" ? true : false}
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          />
          <FormHelperText
            id="nick-helper-text"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
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
          sx={{ fontFamily: "insungitCutelivelyjisu" }}
        >
          닉네임 중복 확인
        </Button>
        <Box sx={buttonBoxStyle}>
          <StyledButton variant="contained" type="submit">
            변경
          </StyledButton>
          <StyledButton variant="contained" onClick={onCloseModal}>
            취소
          </StyledButton>
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
