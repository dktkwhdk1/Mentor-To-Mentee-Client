import React, { useState } from 'react';
import UserInfoSetting from './UserInfoSetting';
import styled, { css } from 'styled-components';

const MyPageTemplate = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding-top: 30px;
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
    ${(props) =>
      props.openUserSetting &&
      css`
        background: #e9ecef;
      `}
  }
  .mentee {
    ${(props) =>
      props.openMenteeSetting &&
      css`
        background: #e9ecef;
      `}
  }
  .password {
    ${(props) =>
      props.openPasswordSetting &&
      css`
        background: #e9ecef;
      `}
  }
`;

function MyPage() {
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
      </SettingSelector>
      <UserInfoSetting />
    </MyPageTemplate>
  );
}

export default MyPage;
