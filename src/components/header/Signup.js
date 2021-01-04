import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalOverlay, ModalWrapper } from '../ModalMessage';
import { AiOutlineMail } from 'react-icons/ai';
import { StyledLink } from './Header';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const TemplateSignUpAndLogin = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: auto;
  border-radius: 10px;
  position: relative;
  background-color: white;
  transform: translateY(-50%);
  top: 50%;
  margin: 0 auto;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  overflow: auto;
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

  .pw {
    margin-bottom: 10px;
  }

  .signup {
    margin-top: 40px;
  }
  .login {
    margin-top: 40px;
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

  .login-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .google {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  .naver {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  .email {
    width: 22px;
    height: 22px;
    margin-right: 4px;
  }
`;

export const Button = styled.button`
  width: 300px;
  border: 1px solid rgb(37, 37, 37);
  background: rgb(37, 37, 37);
  color: white;
  height: 40px;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: #b9a186;
    color: white;
    border: #b9a186 1px solid;
  }
`;

export const Input = styled.input`
  margin: 10px;
  width: 285px;
  height: 25px;
  padding: 0px;
  padding-left: 10px;
`;

function Signup({ signupButtonOn, setLoginButtonOn, setSignupButtonOn }) {
  const [emailButtonOn, setEmailButtonOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inValid, setInValid] = useState(false);

  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const onMaskClick = e => {
    if (e.target === e.currentTarget) {
      setSignupButtonOn(false);
    }
  };
  const maskClosable = true;

  // 회원가입 모달창 닫기
  const exitSignup = () => {
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
  const signupFormHandler = e => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  //회원가입 요청
  const requsetSignUp = () => {
    //TODO 유효성검사
    let { username, email, password } = signupForm;
    if (!username || !email || !password) {
      setInValid(true);
      openModal();
    } else {
      setInValid(false);
      axios.post('https://localhost:4000/emailSignUp', signupForm).then(() => {
        openModal();
      });
    }
  };

  return (
    <>
      <ModalOverlay visible={signupButtonOn} />
      <ModalWrapper
        onClick={maskClosable ? onMaskClick : null}
        tabIndex='-1'
        visible={signupButtonOn}
      >
        <TemplateSignUpAndLogin>
          <h2 className='signup'>회원가입</h2>
          <div className='buttons'>
            <Button className='modal-item'>
              <div className='login-icon'>
                <img
                  src='https://d2ljmlcsal6xzo.cloudfront.net/assets/icons/google_logo-18f6b0c2c760efa52704288819167e97100f8a16799e10ae38990260f5b0341f.png'
                  alt=''
                  className='google'
                />
                구글 아이디로 가입
              </div>
            </Button>
            <Button className='modal-item'>
              <div className='login-icon'>
                <img
                  src='https://d2ljmlcsal6xzo.cloudfront.net/assets/icons/naver_logo-332865f7b796a02822378e0b61e6dcace93ae9a24abd810cd774a06b5fbcb0b5.png'
                  alt=''
                  className='naver'
                />
                네이버 아이디로 가입
              </div>
            </Button>
            <Button onClick={handleEmailLogin} className='modal-item'>
              <div className='login-icon'>
                <AiOutlineMail className='email' />
                이메일로 가입
              </div>
            </Button>
          </div>

          {emailButtonOn ? (
            <div className='modal-form'>
              <div className='inputs'>
                <Input
                  name='username'
                  onChange={signupFormHandler}
                  type='text'
                  placeholder='이름을 입력해주세요'
                  className='modal-item'
                ></Input>
                <Input
                  name='email'
                  onChange={signupFormHandler}
                  type='text'
                  placeholder='이메일을 입력해주세요'
                  className='modal-item'
                ></Input>
                <Input
                  name='password'
                  onChange={signupFormHandler}
                  type='password'
                  placeholder='비밀번호를 입력해주세요'
                  className='modal-item pw'
                ></Input>
              </div>
              <StyledLink to='/'>
                <Input
                  onClick={requsetSignUp}
                  type='submit'
                  value='회원가입'
                  className='modal-item modal-submit'
                ></Input>
              </StyledLink>
            </div>
          ) : (
            ''
          )}
          {modalVisible ? (
            <Modal
              isMiddle={true}
              visible={modalVisible}
              closable={true}
              maskClosable={true}
              onClose={() => {
                closeModal();
                exitSignup();
              }}
            >
              회원가입이 완료되었습니다.
            </Modal>
          ) : (
            ''
          )}
          {inValid ? (
            <Modal
              isMiddle={true}
              visible={modalVisible}
              closable={true}
              maskClosable={true}
              onClose={() => {
                closeModal();
              }}
            >
              모든 정보를 입력해주세요
            </Modal>
          ) : (
            ''
          )}
          <h5 onClick={handleLoginButton} className='text-link'>
            이미 계정이 있으시다면? 로그인
          </h5>
          <h5 onClick={exitSignup} className='text-link'>
            닫기
          </h5>
        </TemplateSignUpAndLogin>
      </ModalWrapper>
    </>
  );
}

export default Signup;
