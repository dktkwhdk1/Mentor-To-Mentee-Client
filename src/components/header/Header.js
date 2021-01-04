import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';
import Signup from './Signup';
import { useSelector } from 'react-redux';
import SideBar from './SideBar';
import { MdMenu } from 'react-icons/md';

const HeaderDiv = styled.nav`
  background-color: white;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;

  h1 {
    margin: 0 120px;
    font-family: 'Nanum Myeongjo', serif;
    font-weight: 800;
  }

  .hamburger {
    width: 35px;
    height: 35px;
    cursor: pointer;
    margin-right: 120px;
  }

  .login-btn {
    cursor: pointer;
    margin-right: 120px;
    font-family: 'Nanum Myeongjo', serif;
    font-weight: 800;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function Header({ loginButtonOn, setLoginButtonOn }) {
  const [signupButtonOn, setSignupButtonOn] = useState(false);
  const [sideBarOn, setSideBarOn] = useState(false);
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);

  //로그인 버튼 눌렀을때, 로그인 모달창 띄우기
  const renderLoginModal = () => {
    setLoginButtonOn(!loginButtonOn);
    setSignupButtonOn(false);
  };

  return (
    <>
      <HeaderDiv>
        <StyledLink to='/'>
          <h1 className='logo'>MENTOR TO MENTEE</h1>
        </StyledLink>

        {isLogin ? (
          <MdMenu
            onClick={() => setSideBarOn(true)}
            className='nav-item hamburger'
          />
        ) : (
          <h3 className='login-btn' onClick={renderLoginModal}>
            Login
          </h3>
        )}
        {sideBarOn ? (
          <SideBar className='sidebar' setSideBarOn={setSideBarOn} />
        ) : (
          ''
        )}
      </HeaderDiv>
      {signupButtonOn ? (
        <Signup
          signupButtonOn={signupButtonOn}
          setLoginButtonOn={setLoginButtonOn}
          setSignupButtonOn={setSignupButtonOn}
        />
      ) : (
        ''
      )}
      {loginButtonOn ? (
        <Login
          loginButtonOn={loginButtonOn}
          setLoginButtonOn={setLoginButtonOn}
          signupButtonOn={signupButtonOn}
          setSignupButtonOn={setSignupButtonOn}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default Header;
