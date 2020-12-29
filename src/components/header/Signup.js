import React, { useState } from 'react';
import styled from 'styled-components';

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
    background-color: rgb(106, 165, 231);
    width: 300px;
    height: 40px;
    border-radius: 7px;
    cursor: pointer;
  }

  .text-link {
    color: gray;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Button = styled.button`
  width: 300px;
  background-color: white;
  height: 40px;
  border-radius: 7px;
  cursor: pointer;
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
  const [nameValue, setNameValue] = useState('이름을 입력해주세요');
  const [emailValue, setEmailValue] = useState('이메일을 입력해주세요');
  const [passwordValue, setPasswordValue] = useState('비밀번호를 입력해주세요');

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

  /*
  //회원가입 폼에 입력된 값을 가져오는 기능
  // Todo 리덕스 Action 적용
  const handleNameInput = (event) => {
    setNameValue(event.target.value);
  };
  const handleEmailInput = (event) => {
    setEmailValue(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setPasswordValue(event.target.value);
  };*/

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
              type='text'
              placeholder={nameValue}
              className='modal-item'
            ></Input>
            <Input
              type='text'
              placeholder={emailValue}
              className='modal-item'
            ></Input>
            <Input
              type='text'
              placeholder={passwordValue}
              className='modal-item'
            ></Input>
          </div>
          <Input
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
