import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setAccessToken, setLogin } from '../../modules/login';
import { setUserInfo } from '../../modules/userInfoSetting';
import axios from 'axios';
import Modal from '../ModalMessage';

axios.defaults.withCredentials = true;
const LgnModal = styled.div`
  width: 400px;
  height: auto;
  border: 1px solid;
  border-radius: 10px;
  position: fixed;
  background-color: white;
  top: 30%;
  left: 35%;
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
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  //이메일버튼 눌렀을때, 입력 폼 띄워주는 기능
  const handleEmailLogin = () => {
    setEmailButtonOn(true);
  };

  // 회원가입 버튼 누르면 회원가입 폼 렌더링
  const handleSignupButton = () => {
    setLoginButtonOn(false);
    setSignupButtonOn(true);
  };
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitHandler = e => {

    if (!email, !password) {
      openModal();
    }
    else {
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
              console.log(res);
              if (userInfo.email === email) {
                setLoginButtonOn(false);
                dispatch(setLogin(true)); // 스토어에 로그인 상태 저장
                dispatch(setUserInfo(userInfo)); // 스토어에 유저 정보(이름과 이메일) 저장
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    }
  };

  return (
    <LgnModal>
      <h2>로그인</h2>
      <div className='buttons'>
        <Button className='modal-item'>
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
          isPassword={true}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          모든 정보를 입력해주세요
        </Modal>
      ) : (
          ''
        )}
    </LgnModal>
  );
}

export default Login;
