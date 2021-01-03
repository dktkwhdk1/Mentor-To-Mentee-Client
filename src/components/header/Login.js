import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setAccessToken, setLogin } from '../../modules/login';
import { setUserInfo } from '../../modules/userInfoSetting';
import Modal from '../ModalMessage';
import axios from 'axios';
axios.defaults.withCredentials = true;

const LoginModal = styled.div`
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
    color: white;
    width: 300px;
    height: 40px;
    border-radius: 7px;
    border: black 1px solid;
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
  width: 300px;
  background-color: white;
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
function Login({ setLoginButtonOn, setSignupButtonOn }) {
  const [emailButtonOn, setEmailButtonOn] = useState(false);
  //테스트용 강제로그인 기능

  //이메일버튼 눌렀을때, 입력 폼 띄워주는 기능
  const handleEmailLogin = () => {
    setEmailButtonOn(true);
  };
  // TODO : 이메일이나 비밀번호 유효성검사 (이메일 형식, 입력 누락시 빨간색 경고 텍스트를 로그인버튼 밑에 띄우고, Input태그의 border color 를 빨간색으로 바꿔준다 )
  // 회원가입 버튼 누르면 회원가입 폼 렌더링
  const handleSignupButton = () => {
    setLoginButtonOn(false);
    setSignupButtonOn(true);
  };
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post('https://localhost:4000/emailSignIn', {
        email,
        password,
      })
      .then(res => {
        const accessToken = res.data.data.accessToken;
        dispatch(setAccessToken(accessToken)); // 스토어에 토큰 저장
        axios
          .get('https://localhost:4000/accessTokenHandler', {
            headers: { authorization: `Bearer ${accessToken}` },
          })
          .then(res => {
            const userInfo = res.data.data;
            if (userInfo.email === email) {
              dispatch(setLogin(true)); // 스토어에 로그인 상태 저장
              dispatch(setUserInfo(userInfo)); // 스토어에 유저 정보(이름과 이메일) 저장
            }
            openModal();
          });
      });
  };

  const googleLoginHandler = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=635734640302-i2pj1ili5dasjmdptsbunq4l7k56lgqd.apps.googleusercontent.com&redirect_uri=https://localhost:4000/googleCallback&response_type=code&scope=openid%20profile%20email';
  };

  return (
    <LoginModal>
      <h2>로그인</h2>
      <div className='buttons'>
        <Button onClick={googleLoginHandler} className='modal-item'>
          구글 아이디로 로그인
        </Button>
        <Button className='modal-item'>네이버 아이디로 로그인</Button>
        <Button onClick={handleEmailLogin} className='modal-item'>
          이메일로 로그인
        </Button>
      </div>
      {emailButtonOn ? (
        <div className='modal-form'>
          <div className='inputs'>
            <Input
              type='email'
              placeholder='이메일을 입력해주세요'
              className='modal-item'
              onChange={e => setEmail(e.target.value)}
            ></Input>
            <Input
              type='password'
              placeholder='비밀번호를 입력해주세요'
              className='modal-item'
              onChange={e => setPassword(e.target.value)}
            ></Input>
          </div>
          <div>
            <Input
              type='submit'
              value='로그인'
              className='modal-item modal-submit'
              onClick={onSubmitHandler}
            ></Input>
          </div>
        </div>
      ) : (
        ''
      )}
      <h5 onClick={handleSignupButton} className='text-link'>
        계정이 없으시다면? 회원가입
      </h5>
      {modalVisible ? (
        <Modal
          isMiddle={true}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={() => {
            setLoginButtonOn(false);
            closeModal();
          }}
        >
          로그인에 성공하셨습니다.
        </Modal>
      ) : (
        ''
      )}
    </LoginModal>
  );
}

export default Login;
