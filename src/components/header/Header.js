import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';
import Signup from './Signup';
import { useSelector } from 'react-redux';
import SideBar from './SideBar'
import { MdMenu } from "react-icons/md";


const HeaderDiv = styled.nav`
  background-color: white;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 30px;
  
  h1 {
    margin: 0 30px;
  }

  .hamburger {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }

  .login-btn {
    cursor: pointer;
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

// const MainImage = styled.div`
//   height: 370px;
//   img {
//     height: 370px;
//     width: 100%;
//   }
// `;

function Header({ loginButtonOn, setLoginButtonOn }) {
  //isLogin 여부에 따라서 NavBar에 로그인 버튼만 나타나거나, 다른 메뉴들이 나타남
  // const [isLogin, setLogin] = useState(false);
  const [signupButtonOn, setSignupButtonOn] = useState(false);
  const [sideBarOn, setSideBarOn] = useState(false)
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);
  console.log(sideBarOn)
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
          <MdMenu onClick={()=>setSideBarOn(true)} className='nav-item hamburger'/>
        ) : (
         
            <h3 className='login-btn' onClick={renderLoginModal}>
              Login
            </h3>
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
            setLoginButtonOn={setLoginButtonOn}
            signupButtonOn={signupButtonOn}
            setSignupButtonOn={setSignupButtonOn}
          />
        ) : (
          ''
        )}

        {sideBarOn? <SideBar className='sidebar'setSideBarOn={setSideBarOn}/> : ''}
      </HeaderDiv>
    </>
  );
}

export default Header;
