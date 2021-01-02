import React, { useState } from 'react';
import UserInfoSetting from './UserInfoSetting';
import MenteeSetting from './MenteeSetting';
import PasswordSetting from './PasswordSetting';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom'

const MyPageTemplate = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding-top: 30px;
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

const SettingSelector = styled.div`
  width: 120px;
  height: 120px;
  padding-top: 10px;
  padding-right: 10px;

  /*border-radius: 10px;*/
  /*background: #e9ecef;*/

  div {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    font-weight: bold;
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
      `}
  }
  .mentee {
    ${props =>
    props.openMenteeSetting &&
    css`
        background: #e9ecef;
      `}
  }
  .password {
    ${props =>
    props.openPasswordSetting &&
    css`
        background: #e9ecef;
      `}
  }
`;

function MyPage({ isMentor }) {
  const [openUserSetting, setUserSetting] = useState(true);
  const [openMenteeSetting, setMenteeSetting] = useState(false);
  const [openPasswordSetting, setPasswordSetting] = useState(false);

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
        {isMentor ? (
          <StyledLink to='/mypage/mentee-mentor'>
            <div
              className='mentee'
              onClick={() => {
                setUserSetting(false);
                setPasswordSetting(false);
                setMenteeSetting(true);
              }}
            >
              멘티/멘토 설정
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
                멘티 설정
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
      {openMenteeSetting && <MenteeSetting />}
      {openPasswordSetting && <PasswordSetting />}
    </MyPageTemplate>
  );
}

export default MyPage;
