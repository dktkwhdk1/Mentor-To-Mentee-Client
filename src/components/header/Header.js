import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserModal from './UserModal';
import Login from './Login';
import Signup from './Signup';

const Nav = styled.nav`
  background-color: rgb(89, 175, 204);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin: 0 20px;
  }

  .menu {
    display: flex;
    padding-right: 30px;
    align-items: center;
  }

  .nav-item {
    /* 페이지를 늘렸을 때 nav-item사이의 패딩이 더 증가하도록 어떻게 할 수 있을까? */
    list-style: none;
    padding: 20px;
    cursor: pointer;
  }

  .nav-item img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const StyledLink = styled(Link)`
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
  //isLogin 여부에 따라서 NavBar에 로그인 버튼만 나타나거나, 다른 메뉴들이 나타남
  const [isLogin, setLogin] = useState(false);
  const [userModalButtonOn, setUserModalButtonOn] = useState(false);
  const [signupButtonOn, setSignupButtonOn] = useState(false);

  //로그인 버튼 눌렀을때, 로그인 모달창 띄우기
  const renderLoginModal = () => {
    setLoginButtonOn(!loginButtonOn);

    //!회원가입 창 떠있는 상태에서 로그인 버튼 눌렀을때 모달이 겹치는 문제때문에 코드 한 줄 추가했어요
    setSignupButtonOn(false)
  };

  // 우측상단 아이콘 클릭하면 마이페이지, 로그아웃 모달띄우기
  const userModalHandler = () => {
    setUserModalButtonOn(!userModalButtonOn);
  };

  return (
    <Nav>
      <StyledLink to='/'>
        <h1 className='logo'>Mentor-to-Mentee</h1>
      </StyledLink>
      {isLogin ? (
        <ul className='menu'>
          <StyledLink to='/myquestion'>
            <li className='nav-item'>나의 질문</li>
          </StyledLink>
          <StyledLink to='/applymentor'>
            <li className='nav-item'>멘토 지원하기</li>
          </StyledLink>

          <div onClick={userModalHandler} className='nav-item'>
            <img
              src='https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-3.jpg'
              alt=''
            />
          </div>

          {userModalButtonOn ? (
            <UserModal
              setUserModalButtonOn={setUserModalButtonOn}
              setLogin={setLogin}
            ></UserModal>
          ) : (
            ''
          )}
        </ul>
      ) : (
        <ul className='menu'>
          <li className='nav-item' onClick={renderLoginModal}>
            Login
          </li>
        </ul>
      )}

      {signupButtonOn ? (
        <Signup
          setLoginButtonOn={setLoginButtonOn}
          setSignupButtonOn={setSignupButtonOn}
        ></Signup>
      ) : (
        ''
      )}
      {loginButtonOn ? (
        <Login
          setLogin={setLogin}
          setLoginButtonOn={setLoginButtonOn}
          signupButtonOn={signupButtonOn}
          setSignupButtonOn={setSignupButtonOn}
        />
      ) : (
        ''
      )}
    </Nav>
  );
}

export default Header;
