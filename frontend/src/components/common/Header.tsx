import React, { useEffect, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { useNavigate } from "react-router-dom";
import { logoutAction, setUserWithTokenAction } from "../../redux/modules/user";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logo from "/assets/img/LOGO2.png";

const Header = () => {
  // State
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userData);
  const isLogin = useAppSelector((state) => state.user.userData.isLoggedIn);
  const profile = useAppSelector((state) => state.user.userData.profile);
  const nickName = useAppSelector((state) => state.user.userData.nickName);
  const [loginCheck, setLoginCheck] = useState<boolean>(isLogin);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Logic
  const onLogout = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(logoutAction());
    setLoginCheck(false);
    setAnchorEl(null);
    navigate("/main");
  };

  // 프로필, 로그아웃
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goMyPage = () => {
    dispatch(setUserWithTokenAction()).then(() => navigate("/mypage"));
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
            <LogoBtn onClick={() => navigate("/main")}>
              <MainLogo src={logo}></MainLogo>
            </LogoBtn>
            <NavigateContents>
              <StyledButton onClick={() => navigate("/videolist")}>
                A n i m a t i o n
              </StyledButton>
              <StyledButton onClick={() => navigate("/drawing")}>
                D r a w i n g
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
                  <ProfileImg
                    src={`/assets/img/shiba/Shiba_${user.profile}.png`}
                  ></ProfileImg>
                </Button>
              ) : (
                <div>
                  <button onClick={() => navigate("/login")}>Login</button>
                </div>
              )}
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem sx={ButtonStyle} onClick={goMyPage}>
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
const StickyHeader = styled.header(
  tw`fixed top-0 w-full`,
  css`
    z-index: 999;
  `
);

const CustomedNav = styled.nav(
  tw`
    bg-white 
    backdrop-filter 
    backdrop-blur-xl
    bg-opacity-30
    border-gray-200
    // h-20
  `,
  css`
    font-family: "insungitCutelivelyjisu";
    height: 100%;
  `
);

const NavWrapper = styled.div(tw`ml-0 mr-0 px-6`);

const NavWrapperContents = styled.div(
  tw`flex items-center`,
  css`
    justify-content: space-between;
    height: 3vw;
  `
);

const MainLogo = styled.img`
  height: 2.25vw;
`;

const LogoBtn = styled.button`
  height: 2.25vw;
`;

const NavigateContents = styled.div(
  tw`flex text-xl text-gray-900`,
  css`
    /* width: 20.7vw; */
    /* position: absolute; */
    left: 38vw;
  `
);

const Profile = styled.div(
  tw`text-2xl`,
  css`
    /* position: absolute; */
    margin-right: 1vw;
  `
);

const StyledButton = styled.button`
  /* size: 10vw; */
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 1vw;
  padding-right: 1vw;
  padding-left: 1vw;
  height: 2.25vw;
`;
const ProfileImg = styled.img`
  width: 2.25vw;
  height: 2.25vw;
  display: block;
  float: left;
  margin-left: 5%;
  margin-top: 4%;
  border-radius: 70%;
`;

const ButtonStyle = {
  fontFamily: "insungitCutelivelyjisu",
};

const ProfileNickName = styled.div`
  font-family: "insungitCutelivelyjisu";
`;

export default Header;
