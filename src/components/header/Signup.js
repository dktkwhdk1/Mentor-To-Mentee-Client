import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
axios.defaults.withCredentials = true;

//styled component
const Modal = styled.div`
  width: 400px;
  height: auto;
  border: 1px solid;
  border-radius: 10px;
  position: absolute;
  background-color: white;
  top: 30%;
  left: 30%;
  margin: auto;
  padding-bottom: 30px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  .modal-item {
    position: relative;
    top: 10%;
    margin: 5px;
    display: block;
  }

  .modal-submit {
    background-color: rgb(37, 37, 37);
    border: black 1px solid;
    color: white;
    width: 300px;
    height: 40px;
    border-radius: 7px;
    cursor: pointer;

    &:hover {
      background-color: #b9a186;
      border: #b9a186 1px solid;
    }
  }

  .text-link {
    color: gray;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Button = styled.button`
  background-color: white;
  width: 300px;
  height: 40px;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: #b9a186;
    color: white;
    border: #b9a186 1px solid;
  }
`;
const Input = styled.input`
  margin: 10px;
  width: 285px;
  height: 25px;
  padding: 0px;
  padding-left: 10px;
`;

function Signup({ setLoginButtonOn, setSignupButtonOn }) {
  const [emailButtonOn, setEmailButtonOn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 모달창 닫기
  const exitModal = () => {
    setSignupButtonOn(false);
  };

  //이메일버튼 눌렀을때, 입력 폼 띄워주는 기능
  const handleEmailLogin = () => {
    setEmailButtonOn(true);
  };

  // 로그인 버튼 누르면 로그인 폼 렌더링
  const handleLoginButton = () => {
    setSignupButtonOn(false);
    setLoginButtonOn(true);
  };

  //회원가입 폼에 입력된 값을 가져오는 기능
  const handleNameInput = event => {
    setUsername(event.target.value);
  };
  const handleEmailInput = event => {
    setEmail(event.target.value);
  };
  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  //회원가입 요청
  const signUpData = { username, email, password };
  const requsetSignUp = () => {
    axios.post('https://localhost:4000/emailSignUp', signUpData);
  };

  return (
    <Modal>
      <h2>회원가입</h2>
      <div className='buttons'>
        <Button className='modal-item'>구글 아이디로 가입</Button>
        <Button className='modal-item'>네이버 아이디로 가입</Button>
        <Button onClick={handleEmailLogin} className='modal-item'>
          이메일로 가입
        </Button>
      </div>

      {emailButtonOn ? (
        <div className='modal-form'>
          <div className='inputs'>
            <Input
              onChange={handleNameInput}
              type='text'
              placeholder='이름을 입력해주세요'
              className='modal-item'
            ></Input>
            <Input
              onChange={handleEmailInput}
              type='text'
              placeholder='이메일을 입력해주세요'
              className='modal-item'
            ></Input>
            <Input
              onChange={handlePasswordInput}
              type='text'
              placeholder='비밀번호를 입력해주세요'
              className='modal-item'
            ></Input>
          </div>
          <Input
            onClick={requsetSignUp}
            type='submit'
            value='회원가입'
            className='modal-item modal-submit'
          ></Input>
        </div>
      ) : (
        ''
      )}

      <h5 onClick={handleLoginButton} className='text-link'>
        이미 계정이 있으시다면? 로그인
      </h5>
      <h5 onClick={exitModal} className='text-link'>
        닫기
      </h5>
    </Modal>
  );
}

export default Signup;
