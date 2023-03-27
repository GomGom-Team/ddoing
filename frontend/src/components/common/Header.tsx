import React, { useEffect, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/modules/user";

const Header = () => {
  // State
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.user.userData.isLoggedIn);
  const [loginCheck, setLoginCheck] = useState<boolean>(isLogin);
  // Logic
  const onLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logoutAction());
    setLoginCheck(false);
    // location.reload();
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
              <button onClick={() => navigate("/animation")}>Animation</button>
              <button onClick={() => navigate("/drawing")}>Drawing</button>
              <button onClick={() => navigate("/ranking")}>Ranking</button>
            </NavigateContents>
            <Profile>
              {loginCheck ? (
                <div>
                  <button onClick={() => navigate("/mypage")}>프로필</button>{" "}
                  <button onClick={onLogout}>로그아웃</button>
                </div>
              ) : (
                <div>
                  <button onClick={() => navigate("/login")}>로그인</button>{" "}
                  <button onClick={() => navigate("/register")}>
                    회원가입
                  </button>
                </div>
              )}
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
  `
);

const NavWrapper = styled.div(tw`ml-0 mr-0 px-6`);

const NavWrapperContents = styled.div(
  tw`flex items-center justify-between h-16`
);

const MainLogo = styled.button(tw`text-2xl text-gray-900 font-semibold`);

const NavigateContents = styled.div(tw`flex space-x-4 text-xl text-gray-900`);

const Profile = styled.div(tw`text-2xl`);

export default Header;
