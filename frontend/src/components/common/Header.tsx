import React from 'react';
import tw, { css, styled, theme } from 'twin.macro'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // State
  const navigate = useNavigate();

  // Logic

  // if (window.location.pathname === '/' | '/') return null;
  return (
  <StickyHeader>
    <CustomedNav>
      <NavWrapper>
        <NavWrapperContents>
          <MainLogo>또잉</MainLogo>
          <NavigateContents>
            <button onClick={()=>navigate("animation")}>Animation</button>
            <button onClick={()=>navigate("drawing")}>Drawing</button>
            <button onClick={()=>navigate("ranking")}>Ranking</button>
          </NavigateContents>
          <Profile>
            <button onClick={()=>navigate("mypage")}>프로필</button>
          </Profile>
        </NavWrapperContents>
      </NavWrapper>
    </CustomedNav>
  </StickyHeader>
  );
};

// style
const StickyHeader = styled.header(
  tw`fixed top-0 z-10 w-full`
)

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
)

const NavWrapper = styled.div(
  tw`ml-0 mr-0 px-6`
)

const NavWrapperContents = styled.div(
  tw`flex items-center justify-between h-16`
)

const MainLogo = styled.span(
  tw`text-2xl text-gray-900 font-semibold`
)

const NavigateContents = styled.div(
  tw`flex space-x-4 text-xl text-gray-900`
)

const Profile = styled.div(
  tw`text-2xl`
)


export default Header;