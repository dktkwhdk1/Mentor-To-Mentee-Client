import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setLogin } from '../../modules/login';
import axios from 'axios';
import CloseButton from '../CloseButton';

const Nav = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  right: 0;
  height: 100%;
  width: 30%;
  z-index: 1;
  border-left: #ccc 1px solid;
  background-color: black;
  opacity: 0.8;

  .nav-content {
    margin-bottom: 300px;
  }

  .nav-quit {
    position: absolute;
    font-size: 15px;
    top: 20px;
    right: 15px;
  }

  .nav-item {
    font-size: 20px;
    color: white;
    list-style: none;
    padding: 20px;
    cursor: pointer;
  }

  .nav-hover {
    padding-left: 40px;
    &:hover {
      background-color: #fff;
      color: #242424;
    }
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

function SideBar({ setSideBarOn }) {
  const [userModalButtonOn, setUserModalButtonOn] = useState(false);
  let accessToken = useSelector(state => state.login.token);
  const userEmail = useSelector(state => state.userInfoSetting.email);

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    // accessToken을 헤더에 담아서 accessTokenHandler 보내고, userInfo를 받아온다
    let res = await axios.get('https://localhost:4000/accessTokenHandler', {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    let userInfo = res.data.data;
    //userinfo가 없으면 리프레시 토큰 요청
    if (!userInfo) {
      let res = await axios.get('https://localhost:4000/refreshTokenHandler');
      userInfo = res.data.data.userInfo;
    }
    // 정상적으로 인증되었을경우 로그아웃 요청
    if (userInfo.email === userEmail) {
      axios.get('https://localhost:4000/signOut').then(res => {
        dispatch(setAccessToken(res.data.accessToken)); // -> accessToken = null
        dispatch(setLogin(false));
        // setUserModalButtonOn(false);
      });
    }
  };

  return (
    <>
      <Nav className='menu'>
        <div onClick={() => setSideBarOn(false)} className='nav-item nav-quit'>
          <CloseButton
            onClick={() => setSideBarOn(false)}
            className='nav-quit'
          />
        </div>
        <div className='nav-content'>
          <StyledLink to='/myquestion'>
            <li
              onClick={() => setSideBarOn(false)}
              className='nav-item nav-hover'
            >
              나의 질문
            </li>
          </StyledLink>
          <StyledLink to='/applymentor'>
            <li
              onClick={() => setSideBarOn(false)}
              className='nav-item nav-hover'
            >
              멘토 지원하기
            </li>
          </StyledLink>

          <StyledLink to='/mypage'>
            <li
              onClick={() => setSideBarOn(false)}
              className='nav-item nav-hover'
            >
              마이페이지
            </li>
          </StyledLink>
          <StyledLink to='/'>
            <li
              onClick={() => {
                logoutHandler();
                setSideBarOn(false);
              }}
              className='nav-item nav-hover'
            >
              로그아웃
            </li>
          </StyledLink>
        </div>
      </Nav>
    </>
  );
}

export default SideBar;
