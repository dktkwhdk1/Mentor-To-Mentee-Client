import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken, setLogin } from '../../modules/login';
import { setUserInfo } from '../../modules/userInfoSetting';
import { AiOutlineMail } from 'react-icons/ai';
import Modal, { ModalOverlay, ModalWrapper } from '../ModalMessage';
import { TemplateSignUpAndLogin, Button, Input } from './Signup';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Login({ loginButtonOn, setLoginButtonOn, setSignupButtonOn }) {
  const [emailButtonOn, setEmailButtonOn] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    modal: false,
    login: false,
  });
  const openModal = login => {
    setModalVisible({ modal: true, login });
  };
  const closeModal = () => {
    setModalVisible({ modal: false, login: false });
  };

  const onMaskClick = e => {
    if (e.target === e.currentTarget) {
      setLoginButtonOn(false);
    }
  };
  const maskClosable = true;

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
    if (!email || !password) {
      openModal(false);
    } else {
      e.preventDefault();
      axios
        .post('https://localhost:4000/emailSignIn', {
          email,
          password,
        })
        .then(res => {
          const accessToken = res.data.data.accessToken;
          dispatch(setAccessToken(accessToken));
          axios
            .get('https://localhost:4000/accessTokenHandler', {
              headers: { authorization: `Bearer ${accessToken}` },
            })
            .then(res => {
              const userInfo = res.data.data;
              if (userInfo.email === email) {
                dispatch(setLogin(true));
                dispatch(setUserInfo(userInfo));
              }
              openModal(true);
            });
        });
    }
  };
  const naverLoginHandler = async () => {
    const client_id = 'jzmv9M17ZktTLYgIxIfb';
    const state = Math.random().toString(36).slice(2);
    const redirectURI = encodeURI('https://localhost:4000/naverCallback');
    const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
    window.location.assign(api_url);
  };

  return (
    <>
      <ModalOverlay visible={loginButtonOn} />
      <ModalWrapper
        onClick={maskClosable ? onMaskClick : null}
        tabIndex='-1'
        visible={loginButtonOn}
      >
        <TemplateSignUpAndLogin>
          <h2 className='login'>로그인</h2>
          <div className='buttons'>
            <Button className='modal-item'>
              <div className='login-icon'>
                <img
                  src='https://d2ljmlcsal6xzo.cloudfront.net/assets/icons/google_logo-18f6b0c2c760efa52704288819167e97100f8a16799e10ae38990260f5b0341f.png'
                  alt=''
                  className='google'
                />
                구글 아이디로 로그인
              </div>
            </Button>
            <Button className='modal-item' onClick={naverLoginHandler}>
              <div className='login-icon'>
                <img
                  src='https://d2ljmlcsal6xzo.cloudfront.net/assets/icons/naver_logo-332865f7b796a02822378e0b61e6dcace93ae9a24abd810cd774a06b5fbcb0b5.png'
                  alt=''
                  className='naver'
                />
                네이버 아이디로 로그인
              </div>
            </Button>
            <Button className='modal-item' onClick={handleEmailLogin}>
              <div className='login-icon'>
                <AiOutlineMail className='email' />
                이메일로 로그인
              </div>
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
                  className='modal-item pw'
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
          {modalVisible.modal ? (
            modalVisible.login ? (
              <Modal
                isMiddle={true}
                visible={modalVisible.login}
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
              <Modal
                isMiddle={true}
                visible={modalVisible.modal}
                closable={true}
                maskClosable={true}
                onClose={closeModal}
              >
                모든 정보를 입력해주세요.
              </Modal>
            )
          ) : (
            ''
          )}
        </TemplateSignUpAndLogin>
      </ModalWrapper>
    </>
  );
}

export default Login;
