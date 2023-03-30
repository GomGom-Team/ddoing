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
import { changePwAction } from "../../redux/modules/user";
import BasicModal from "../common/BasicModal";

function PasswordModal({ open, setOpen }: any): JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const checkDupNick = useAppSelector((state) => state.user.checkNickName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pw, setPw] = useState<string>("");
  const [newPw, setNewPw] = useState("");
  const [rePw, setRePw] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);
  const [isEditPw, setIsEditPw] = useState<boolean>(false);
  const [isEditNewPw, setIsEditNewPw] = useState<boolean>(false);
  const [showNewPw, setShowNewPw] = useState<boolean>(false);
  const [newPwCheck, setNewPwCheck] = useState<boolean>(false);
  const [rePwCheck, setRePwCheck] = useState<boolean>(false);

  const onReSetPW = () => {
    setPw("");
    setRePw("");
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditPw) {
      setIsEditPw(true);
      // setRePw("");
    }
    setPw(e.target.value);
  };
  const onChangeNewPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditNewPw) {
      setIsEditNewPw(true);
      setRePw("");
    }
    setNewPw(e.target.value);

    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regex.test(e.target.value)) {
      setNewPwCheck(true);
    } else {
      setNewPwCheck(false);
    }
  };
  const onChangeRePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePw(e.target.value);
  };

  const handleClickShowPw = () => {
    setShowPw((prev) => !prev);
  };
  const handleMouseDownPw = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleClickShowNewPw = () => {
    setShowNewPw((prev) => !prev);
  };
  const handleMouseDownNewPw = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditNewPw || (isEditPw && isEditNewPw && newPwCheck && rePwCheck)) {
      dispatch(
        changePwAction({
          id: user.id,
          password: pw,
          newPassword: newPw,
        })
      ).then(() => {
        onCloseModal();
      });

      // onCloseModal();
      // navigate("/main", { replace: true });
    }
  };

  useEffect(() => {
    if (newPw === rePw) {
      setRePwCheck(true);
    } else {
      setRePwCheck(false);
    }
  }, [newPw, rePw]);

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
        <h2 id="parent-modal-title">비밀번호 변경</h2>
        <div>
          <FormControl variant="standard">
            <InputLabel htmlFor="pw">현재 비밀번호</InputLabel>
            <Input
              id="pw"
              value={pw}
              onChange={onChangePw}
              // onFocus={onReSetPW}
              type={showPw ? "text" : "password"}
              required
              error={isEditPw && newPw && !rePwCheck ? true : false}
              aria-describedby="pw-helper-text"
              endAdornment={
                <InputAdornment position="end">
                  {isEditPw && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPw}
                      onMouseDown={handleMouseDownPw}
                    >
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <FormControl variant="standard">
          <InputLabel htmlFor="newPw">새 비밀번호</InputLabel>
          <Input
            id="newPw"
            value={newPw}
            onChange={onChangeNewPw}
            // onFocus={onReSetPW}
            type={showNewPw ? "text" : "password"}
            required
            error={isEditNewPw && newPw && !rePwCheck ? true : false}
            aria-describedby="pw-helper-text"
            endAdornment={
              <InputAdornment position="end">
                {isEditNewPw && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPw}
                    onMouseDown={handleMouseDownNewPw}
                  >
                    {showNewPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
          <FormHelperText id="pw-helper-text">
            {isEditNewPw && !rePwCheck && (
              <span>영문, 숫자, 특수문자 포함, 8~16자</span>
            )}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="re-pw">새 비밀번호 확인</InputLabel>
          <Input
            id="re-pw"
            value={rePw}
            onChange={onChangeRePw}
            type="password"
            required
            error={rePw && !rePwCheck ? true : false}
            aria-describedby="repw-helper-text"
            endAdornment={
              <InputAdornment position="end">
                {isEditNewPw && rePw && rePwCheck && <CheckRounded />}
              </InputAdornment>
            }
            disabled={!isEditNewPw}
          />
          <FormHelperText id="repw-helper-text">
            {rePw && !rePwCheck && <span>비밀번호가 일치하지 않습니다</span>}
          </FormHelperText>
        </FormControl>

        <Box sx={buttonBoxStyle}>
          <Button variant="contained" type="submit">
            비밀번호 변경
          </Button>
          <Button variant="contained" onClick={onCloseModal}>
            취소
          </Button>
        </Box>
      </Box>
    </BasicModal>
  );
}
export default PasswordModal;

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
