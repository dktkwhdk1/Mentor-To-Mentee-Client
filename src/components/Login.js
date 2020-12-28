import React, { useState } from 'react'
import styled from 'styled-components';

//styled component
const Modal = styled.div`
width: 400px;
height: auto;
border: 1px solid;
border-radius: 10px;
position: absolute;
background-color:white;
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
`
const Button = styled.button`
width: 300px;
background-color: white;
height: 40px;
border-radius: 7px;
cursor: pointer;
`
const Input = styled.input`
margin: 10px;
width: 285px;
height: 25px;
padding: 0px;
padding-left: 10px;
`

function Login({ setLogin, setLoginButtonOn, setSignupButtonOn }) {
    const [emailButtonOn, setEmailButtonOn] = useState(false)
    const [emailValue, setEmailValue] = useState("이메일을 입력해주세요")
    const [passwordValue, setPasswordValue] = useState("비밀번호를 입력해주세요")

    //테스트용 강제로그인 기능
    const handleForcedLogin = () => {
        setLogin(true)
        setLoginButtonOn(false)
    }
    //이메일버튼 눌렀을때, 입력 폼 띄워주는 기능
    const handleEmailLogin = () => {
        setEmailButtonOn(true)
    }

    // 로그인 폼에 입력된 값을 가져오는 기능
    // Todo 리덕스 Action 적용
    const handleEmailInput = (event) => {
        setEmailValue(event.target.value)
    }
    const handlePasswordInput = (event) => {
        setPasswordValue(event.target.value)
    }

    //TODO : 로그인 버튼 클릭시 서버에 POST 요청보내기

    //TODO : 이메일이나 비밀번호 유효성검사 (이메일 형식, 입력 누락시 빨간색 경고 텍스트를 로그인버튼 밑에 띄우고, Input태그의 border color 를 빨간색으로 바꿔준다 )

    //회원가입 버튼 누르면 회원가입 폼 렌더링
    const handleSignupButton = () => {
        setLoginButtonOn(false)
        setSignupButtonOn(true)
    }


    return (
        <Modal>
            <h2>로그인</h2>
            <div className="buttons">
                <Button className="modal-item">구글 아이디로 로그인</Button>
                <Button className="modal-item">네이버 아이디로 로그인</Button>
                <Button onClick={handleEmailLogin} className="modal-item">이메일로 로그인</Button>
                <Button onClick={handleForcedLogin} className="modal-item">(테스트용) 강제로그인</Button>

            </div>

            {emailButtonOn ?
                <div className="modal-form">
                    <div className="inputs">
                        <Input type="text" placeholder={emailValue} className="modal-item"></Input>
                        <Input type="text" placeholder={passwordValue} className="modal-item"></Input>
                    </div>
                    <div>
                        <Input type="submit" value="로그인" className="modal-item modal-submit"></Input>
                    </div>
                </div> : ''
            }

            <h5 onClick={handleSignupButton} className="text-link">계정이 없으시다면? 회원가입</h5>

        </Modal>

    )
}

export default Login
