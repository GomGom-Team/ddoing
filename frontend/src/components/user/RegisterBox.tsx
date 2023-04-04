import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import {
  signupAction,
  checkIdAction,
  checkNickNameAction,
  checkEmailAction,
} from "../../redux/modules/user";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { CheckRounded, VisibilityOff, Visibility } from "@mui/icons-material";
import InputWithLabel from "./InputWithLabel";

const RegisterBox = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const checkId = useAppSelector((state) => state.user.checkId);
  const checkNickName = useAppSelector((state) => state.user.checkNickName);
  const checkEmail = useAppSelector((state) => state.user.checkEmail);

  const [uid, setUid] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rePw, setRePw] = useState<string>("");

  const [pwCheck, setPwCheck] = useState<boolean>(false);
  const [idCheck, setIdCheck] = useState<string>("PleaseCheckId");
  const [nickNameCheck, setNickNameCheck] = useState<string>(
    "PleaseCheckNickName"
  );
  const [emailCheck, setEmailCheck] = useState<string>("PleaseCheckEmail");
  const [showPw, setShowPw] = useState<boolean>(false);
  const [rePwCheck, setRePwCheck] = useState<boolean>(false);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value);
    const regex = /^[a-z0-9]{3,11}$/g;
    if (!regex.test(e.target.value)) {
      setIdCheck("RegexFail");
    } else {
      setIdCheck("PleaseCheckId");
    }
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regex.test(e.target.value)) {
      setPwCheck(true);
    } else {
      setPwCheck(false);
    }
  };

  const onChangeRePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePw(e.target.value);
    if (pw === rePw) {
      setPwCheck(true);
    }
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regex.test(e.target.value)) {
      setEmailCheck("RegexFail");
    } else {
      setEmailCheck("PleaseCheckEmail");
    }
  };

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickNameCheck("PleaseCheckNickName");
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      setNickName(e.target.value);
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 중복체크
  const onCheckID = () => {
    dispatch(checkIdAction(uid));
  };

  const onCheckNickName = () => {
    dispatch(checkNickNameAction(nickName));
  };

  const onCheckEmail = () => {
    dispatch(checkEmailAction(email));
  };

  // 비밀번호 보였다 안보였다
  const handleClickShowPw = () => {
    setShowPw((prev) => !prev);
  };
  const handleMouseDownPw = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  // 회원가입 버튼 눌렀을 때
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idCheck && pwCheck && rePwCheck && nickName && emailCheck) {
      dispatch(
        signupAction({
          id: uid,
          password: pw,
          email: email,
          nickName: nickName,
          name: name,
          level: 1,
          exp: 0,
        })
      ).then(() => {
        navigate("/login");
      });
    }
  };

  useEffect(() => {
    if (pw === rePw) {
      setRePwCheck(true);
    } else {
      setRePwCheck(false);
    }
  }, [pw, rePw]);

  useEffect(() => {
    if (checkId.error) {
      setIdCheck("UnAvailable");
    } else if (checkId.data) {
      setIdCheck("Available");
    }
  }, [checkId]);

  useEffect(() => {
    if (checkNickName.error) {
      setNickNameCheck("UnAvailable");
    } else if (checkNickName.data) {
      setNickNameCheck("Available");
    }
  }, [checkNickName]);

  useEffect(() => {
    if (checkEmail.error) {
      setEmailCheck("UnAvailable");
    } else if (checkEmail.data) {
      setEmailCheck("Available");
    }
  }, [checkEmail]);

  return (
    <Box
      component="form"
      sx={boxStyle}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      // sx={{ backgroundImage: "assets/img/login_background.jpg" }}
    >
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
            value={uid}
            onChange={onChangeId}
            required
            error={uid && idCheck !== "Available" ? true : false}
            aria-describedby="id-helper-text"
            endAdornment={
              <InputAdornment position="end">
                {idCheck === "Available" && <CheckRounded />}
              </InputAdornment>
            }
          />
          <FormHelperText
            id="id-helper-text"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            {uid &&
              (idCheck === "Available" ? (
                <span>사용 가능한 ID입니다</span>
              ) : idCheck === "PleaseCheckId" ? (
                <span>아이디 중복 검사를 해주세요</span>
              ) : idCheck === "RegexFail" ? (
                <span>영문자 또는 숫자 4~12자</span>
              ) : (
                <span>이미 사용중인 ID입니다</span>
              ))}
          </FormHelperText>
        </FormControl>
        <Button
          onClick={onCheckID}
          disabled={
            !uid || idCheck === "RegexFail" || idCheck === "Available"
              ? true
              : false
          }
          sx={{ fontFamily: "insungitCutelivelyjisu" }}
        >
          아이디 중복 확인
        </Button>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="pw"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            비밀번호
          </InputLabel>
          <Input
            id="pw"
            value={pw}
            onChange={onChangePw}
            type={showPw ? "text" : "password"}
            required
            error={pw && !pwCheck ? true : false}
            aria-describedby="pw-helper-text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPw}
                  onMouseDown={handleMouseDownPw}
                >
                  {showPw ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            id="pw-helper-text"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            {!pwCheck && <span>영문, 숫자, 특수문자 포함 8~16자</span>}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="re-pw"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            비밀번호 확인
          </InputLabel>
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
                {rePw && rePwCheck && <CheckRounded />}
              </InputAdornment>
            }
          />
          <FormHelperText
            id="repw-helper-text"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            {rePw && !rePwCheck && <span>비밀번호가 일치하지 않습니다</span>}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="name"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            이름
          </InputLabel>
          <Input
            id="name"
            value={name}
            onChange={onChangeName}
            required
            error={name && name === "" ? true : false}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="nickName"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            닉네임
          </InputLabel>
          <Input
            id="nickName"
            value={nickName}
            onChange={onChangeNickName}
            required
            error={nickName && nickName === "" ? true : false}
          />
          <FormHelperText
            id="nick-helper-text"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            {nickName &&
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
          onClick={onCheckNickName}
          disabled={
            !nickName || nickName.length === 0 || nickNameCheck === "Available"
          }
          sx={{ fontFamily: "insungitCutelivelyjisu" }}
        >
          닉네임 중복 확인
        </Button>
        <FormControl variant="standard">
          <InputLabel
            htmlFor="email"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            이메일
          </InputLabel>
          <Input
            id="email"
            value={email}
            onChange={onChangeEmail}
            type="email"
            required
            error={email && emailCheck !== "Available" ? true : false}
            aria-describedby="email-helper-text"
          />
          <FormHelperText
            id="email-helper-text"
            sx={{ fontFamily: "insungitCutelivelyjisu" }}
          >
            {email &&
              (emailCheck === "Available" ? (
                <span>사용 가능한 이메일 입니다</span>
              ) : emailCheck === "PleaseCheckEmail" ? (
                <span>이메일 중복 확인을 해주세요</span>
              ) : emailCheck === "RegexFail" ? (
                <span>올바른 이메일 형식이 아닙니다</span>
              ) : (
                <span>유효한 이메일이 아닙니다</span>
              ))}
          </FormHelperText>
        </FormControl>
        <Button
          onClick={onCheckEmail}
          disabled={
            !email || emailCheck === "RegexFail" || emailCheck === "Available"
              ? true
              : false
          }
          sx={{ fontFamily: "insungitCutelivelyjisu" }}
        >
          이메일 중복 확인
        </Button>
        <Box component="div" sx={buttonBoxStyle}>
          <StyledButton variant="contained" type="submit">
            Sign up
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterBox;

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
    width: "25ch",
    display: "flex",
    justifyContent: "center",
    // marginTop: "15px",
  },
};

const boxStyle2 = {
  position: "absolute",
  left: "50%",
  // top: "20%",
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
