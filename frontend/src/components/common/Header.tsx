import React, { useEffect, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/modules/user";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  // State
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.user.userData.isLoggedIn);
  const profile = useAppSelector((state) => state.user.userData.profile);
  const [loginCheck, setLoginCheck] = useState<boolean>(isLogin);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Logic
  const onLogout = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(logoutAction());
    setLoginCheck(false);
    navigate("/");
  };

  // 프로필, 로그아웃
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setLoginCheck(isLogin);
  }, [isLogin]);

  // if (window.location.pathname === '/' | '/') return null;
  return (
    <StickyHeader>
      <CustomedNav>
        <NavWrapper>
          <NavWrapperContents>
            <MainLogo onClick={() => navigate("/")}>또잉</MainLogo>
            <NavigateContents>
              <StyledButton onClick={() => navigate("/videolist")}>
                A n i m a t i o n
              </StyledButton>
              <StyledButton onClick={() => navigate("/drawing")}>
                D r a w i n g
              </StyledButton>
              <StyledButton onClick={() => navigate("/ranking")}>
                R a n k i n g
              </StyledButton>
            </NavigateContents>
            <Profile>
              {loginCheck ? (
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <ProfileImg src={`assets/img/ddio0.png`}></ProfileImg>
                </Button>
              ) : (
                <div>
                  <button onClick={() => navigate("/login")}>로그인</button>{" "}
                  <button onClick={() => navigate("/register")}>
                    회원가입
                  </button>
                </div>
              )}
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem sx={ButtonStyle} onClick={() => navigate("/mypage")}>
                  Profile
                </MenuItem>
                <MenuItem sx={ButtonStyle} onClick={onLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </Profile>
          </NavWrapperContents>
        </NavWrapper>
      </CustomedNav>
    </StickyHeader>
  );
};

// style
const StickyHeader = styled.header(tw`fixed top-0 z-10 w-full`);

const CustomedNav = styled.nav(
  tw`
    h-16
    bg-white 
    backdrop-filter 
    backdrop-blur-lg 
    bg-opacity-30
    border-b
    border-gray-200
  `,
  css`
    font-family: "insungitCutelivelyjisu";
  `
);

const NavWrapper = styled.div(tw`ml-0 mr-0 px-6`);

const NavWrapperContents = styled.div(
  tw`flex items-center justify-between h-16`
);

const MainLogo = styled.button(tw`text-2xl text-gray-900 font-semibold`);

const NavigateContents = styled.div(tw`flex space-x-4 text-xl text-gray-900`);

const Profile = styled.div(tw`text-2xl`);

const StyledButton = styled.button(tw`px-5`);

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  display: block;
  float: left;
  margin-left: 5%;
  margin-top: 4%;
  border-radius: 70%;
`;

const ButtonStyle = {
  fontFamily: "insungitCutelivelyjisu",
};

export default Header;
