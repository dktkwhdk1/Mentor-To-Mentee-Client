import React, { useState } from 'react';
import UserInfoSetting from './UserInfoSetting';
import MenteeSetting from './MenteeSetting';
import PasswordSetting from './PasswordSetting';
import styled, { css } from 'styled-components';
import { StyledLink } from '../header/Header';
import { useSelector } from 'react-redux';

const MyPageTemplate = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding-top: 30px;
`;

const SettingSelector = styled.div`
  width: 200px;
  height: 120px;
  padding-right: 30px;

  div {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
  .userinfo {
    ${props =>
      props.openUserSetting &&
      css`
        background: #e9ecef;
        font-weight: bold;
      `}
  }
  .mentee {
    ${props =>
      props.openMenteeSetting &&
      css`
        background: #e9ecef;
        font-weight: bold;
      `}
  }
  .password {
    ${props =>
      props.openPasswordSetting &&
      css`
        background: #e9ecef;
        font-weight: bold;
      `}
  }
`;

function MyPage() {
  const AreYouMentor = useSelector(state => state.userInfoSetting.isMentor);
  const [openPasswordSetting, setPasswordSetting] = useState(false);
  const [openMenteeSetting, setMenteeSetting] = useState(false);
  const [openUserSetting, setUserSetting] = useState(true);

  return (
    <MyPageTemplate>
      <SettingSelector
        openUserSetting={openUserSetting}
        openMenteeSetting={openMenteeSetting}
        openPasswordSetting={openPasswordSetting}
      >
        <StyledLink to='/mypage/userinfo'>
          <div
            className='userinfo'
            onClick={() => {
              setUserSetting(true);
              setPasswordSetting(false);
              setMenteeSetting(false);
            }}
          >
            계정 설정
          </div>
        </StyledLink>
        {AreYouMentor ? (
          <StyledLink to='/mypage/mentee-mentor'>
            <div
              className='mentee'
              onClick={() => {
                setUserSetting(false);
                setPasswordSetting(false);
                setMenteeSetting(true);
              }}
            >
              멘티 • 멘토 정보
            </div>
          </StyledLink>
        ) : (
          <StyledLink to='/mypage/mentee'>
            <div
              className='mentee'
              onClick={() => {
                setUserSetting(false);
                setPasswordSetting(false);
                setMenteeSetting(true);
              }}
            >
              멘티 정보
            </div>
          </StyledLink>
        )}
        <StyledLink to='/mypage/password'>
          <div
            className='password'
            onClick={() => {
              setUserSetting(false);
              setPasswordSetting(true);
              setMenteeSetting(false);
            }}
          >
            비밀번호 설정
          </div>
        </StyledLink>
      </SettingSelector>
      {openUserSetting && <UserInfoSetting />}
      {openMenteeSetting && <MenteeSetting AreYouMentor={AreYouMentor} />}
      {openPasswordSetting && <PasswordSetting />}
    </MyPageTemplate>
  );
}

export default MyPage;
