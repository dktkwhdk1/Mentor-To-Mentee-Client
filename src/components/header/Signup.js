import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../ModalMessage';
import { Link } from 'react-router-dom'

//styled component
const SignUp = styled.div`
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
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;


function Signup({ setLoginButtonOn, setSignupButtonOn }) {
    const [emailButtonOn, setEmailButtonOn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [inValid, setInValid] = useState(false);

    const [signupForm, setSignupForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    // 회원가입 모달창 닫기
    const exitSignup = () => {
        setSignupButtonOn(false)
    }

    //이메일버튼 눌렀을때, 입력 폼 띄워주는 기능
    const handleEmailLogin = () => {
        setEmailButtonOn(true)
    }

    // 로그인 버튼 누르면 로그인 폼 렌더링
    const handleLoginButton = () => {
        setSignupButtonOn(false)
        setLoginButtonOn(true)
    }


    //회원가입 폼에 입력된 값을 가져오는 기능
    const signupFormHandler = e => {
        setSignupForm({ ...signupForm, [e.target.name]: e.target.value })
    }

    
    //회원가입 요청
    const requsetSignUp = () => {
        //TODO 유효성검사
        let { username, email, password } = signupForm
        if (!username || !email|| !password) {
            setInValid(true)
            openModal();
        }
        else {
            setInValid(false)
            axios.post('https://localhost:4000/emailSignUp', signupForm, {
                headers: { 'Content-Type': 'application/json' }, withCredentials: true
            })
                .then((res) => {
                    openModal();
                })
                .catch(console.log)
        }
    }

    return (
        <SignUp>
            <h2>회원가입</h2>
            <div className="buttons">
                <Button className="modal-item">구글 아이디로 가입</Button>
                <Button className="modal-item">네이버 아이디로 가입</Button>
                <Button onClick={handleEmailLogin} className="modal-item">이메일로 가입</Button>
            </div>

            {emailButtonOn ?
                <div className="modal-form">
                    <div className="inputs">
                        <Input name='username' onChange={signupFormHandler} type="text" placeholder='이름을 입력해주세요' className="modal-item"></Input>
                        <Input name='email' onChange={signupFormHandler} type="text" placeholder="이메일을 입력해주세요" className="modal-item"></Input>
                        <Input name='password' onChange={signupFormHandler} type="text" placeholder="비밀번호를 입력해주세요" className="modal-item"></Input>
                    </div>
                    <StyledLink to='/'>
                        <Input onClick={requsetSignUp}
                            type="submit" value="회원가입" className="modal-item modal-submit"></Input>

                    </StyledLink>
                </div>

                : ''
            }
            {modalVisible ? (
                <Modal
                    isPassword={true}
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={() => {
                        closeModal();
                        exitSignup();
                    }}
                >회원가입이 완료되었습니다.
                </Modal>
            ) : (
                    ''
                )}
            {inValid ? (
                <Modal
                    isPassword={true}
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={() => {
                        closeModal();
                    }}
                >모든 정보를 입력해주세요
                </Modal>
            ) : (
                    ''
                )}
            <h5 onClick={handleLoginButton} className="text-link">이미 계정이 있으시다면? 로그인</h5>
            <h5 onClick={exitSignup} className="text-link">닫기</h5>
        </SignUp>

    )
}

export default Signup;
