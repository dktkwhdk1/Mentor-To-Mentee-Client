import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import myImage from '../../images.png';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../modules/userInfoSetting';
import axios from 'axios';

axios.defaults.withCredentials = true;

const InsertForm = styled.form`
  background: #f8f9fa;
  width: 484px;
  height: 760px;

  div {
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 20px;
  }

  h1 {
    padding-left: 20px;
    padding-bottom: 20px;
    padding-right: 10px;
    text-align: center;
  }
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 87%;
  font-size: 14px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;

  .image {
    width: 40%;
  }
`;

const Select = styled.select`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 91.5%;
  color: gray;
  margin-left: 20px;
  margin-bottom: 15px;
  font-size: 12px;
  padding: 10px;

  option {
    color: black;
    min-height: 20px;
  }
`;

const Button = styled.button`
  margin-left: 20px;
  margin-top: 10px;
  width: 90px;
  height: 25px;
  display: flex;
  border: 1px solid #dee2e6;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 91.5%;
  font-size: 12px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  background: #38d9a9;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;
/*
const UserImage1 = styled.div`
  background-image: url(${myImage});
  width: 180px;
  height: 180px;
  padding-left: 20px;
`;
*/
const UserImage2 = styled.img`
  src: url(${myImage});
  width: 140px;
  height: 140px;
  padding-left: 20px;
`;

function UserInfoSetting() {
  const userInfo = useSelector(state => ({ ...state.userInfoSetting }));
  if (!userInfo.mobile) {
    // 상태에 저장된 폰 번호가 없음
    // axios.get('https://localhost4000/getmypage')
    console.log('상태에 저장된 폰 번호가 없음');
  }
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');

  const dispatch = useDispatch();
  const onSubmitHandler = e => {
    e.preventDefault();
    alert('설정 저장이 완료되었습니다.');
    /*
    axios
      .post('https://localhost4000/postmypage', {
        mobile: userInfo.mobile,
        gender: userInfo.gender,
      })
      .then((res) => console.log(res));*/
    dispatch(setUserInfo({ mobile, gender }));
  };

  return (
    <InsertForm>
      <h1>계정 설정</h1>
      <div>이메일 *</div>
      <Input value={userInfo.email} readOnly />
      <div>이름 *</div>
      <Input value={userInfo.username} readOnly />
      <div>휴대전화 번호</div>
      <Input
        type='text'
        placeholder='번호를 입력해주세요.(숫자만)'
        onChange={e => setMobile(e.target.value)}
        value={userInfo.mobile}
      ></Input>
      <div>성별</div>
      <Select
        onChange={e => setGender(e.target.value)}
        defaultValue={userInfo.gender}
      >
        <option value='1'>성별을 선택해주세요</option>
        <option value='2'>남자</option>
        <option value='3'>여자</option>
      </Select>
      <div>프로필 사진</div>
      <UserImage2 />
      <Button>이미지 업로드</Button>
      <br></br>
      <SubmitButton onClick={onSubmitHandler}>설정 저장하기</SubmitButton>
    </InsertForm>
  );
}

export default UserInfoSetting;
