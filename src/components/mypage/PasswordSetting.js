import React from 'react';
import styled from 'styled-components';

const InsertForm = styled.form`
  background: #f8f9fa;
  width: 484px;
  height: 500px;

  h1 {
    padding-left: 20px;
    padding-bottom: 30px;
    padding-top: 20px;
    padding-right: 10px;
    text-align: center;
  }
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 91.5%;
  height: 50px;
  font-size: 18px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  background: #38d9a9;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 87%;
  height: 30px;
  font-size: 12px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

function PasswordSetting() {
  return (
    <InsertForm>
      <h1>비밀번호 변경</h1>
      <Input autoFocus placeholder='현재 비밀번호'></Input>
      <Input placeholder='새 비밀번호'></Input>
      <Input placeholder='새 비밀번호 확인'></Input>
      <SubmitButton>비밀번호 변경</SubmitButton>
    </InsertForm>
  );
}

export default PasswordSetting;
