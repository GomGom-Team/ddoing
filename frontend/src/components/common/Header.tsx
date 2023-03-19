import React from 'react';
import tw, { css, styled, theme } from 'twin.macro'
const Header = () => {
  // if (window.location.pathname === '/' | '/') return null;
  return (
    <CustomedNav>
      <NavWrapper>
        <NavWrapperContents>
          <MainLogo>또잉</MainLogo>
          <NavigateContents>
            <a href="/animation">Animation</a>
            <a href="/drawing">Drawing</a>
            <a href="/ranking">Ranking</a>
          </NavigateContents>
          <Profile>
            프로필
          </Profile>
        </NavWrapperContents>
      </NavWrapper>
    </CustomedNav>
  );
};

// style
const CustomedNav = styled.nav(
  tw`
    sticky 
    top-0 
    z-10 
    bg-white 
    backdrop-filter 
    backdrop-blur-lg 
    bg-opacity-30
    border-b
    border-gray-200
  `
)

const NavWrapper = styled.div(
  tw`max-w-5xl mx-auto px-4`
)

const NavWrapperContents = styled.div(
  tw`flex items-center justify-between h-16`
)

const MainLogo = styled.span(
  tw`text-2xl text-gray-900 font-semibold`
)

const NavigateContents = styled.div(
  tw`flex space-x-4 text-gray-900`
)

const Profile = styled.div(
  tw`text-2xl`
)


export default Header;