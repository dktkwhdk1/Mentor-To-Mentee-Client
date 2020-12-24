import React from 'react';
import styled from 'styled-components';
import myImage from '../images.png';

const InsertForm = styled.form`
  background: #f8f9fa;
  width: 484px;
  height: 726px;

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
  font-size: 12px;
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
  &:hover {
    cursor: pointer;
    background: #e9ecef;
  }
`;

const UserImage1 = styled.div`
  background-image: url(${myImage});
  width: 180px;
  height: 180px;
  padding-left: 20px;
`;

const UserImage2 = styled.img`
  src: url(${myImage});
  width: 140px;
  height: 140px;
  padding-left: 20px;
`;

function UserInfoSetting() {
  return (
    <InsertForm>
      <h1>계정 설정</h1>
      <div>이메일 *</div>
      <Input />
      <div>이름 *</div>
      <Input />
      <div>휴대전화 번호</div>
      <Input autoFocus placeholder='번호를 입력해주세요.(숫자만)'></Input>
      <div>성별</div>
      <Select>
        <option value='1' selected>
          성별을 선택해주세요
        </option>
        <option value='2'>남자</option>
        <option value='3'>여자</option>
      </Select>
      <div>프로필 사진</div>
      <UserImage2 />
      <Button>이미지 업로드</Button>
      <Button>설정 저장하기</Button>
    </InsertForm>
  );
}

export default UserInfoSetting;
