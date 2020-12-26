import React, { useState } from 'react'
import { Link } from "react-router-dom"
import styled, { css } from 'styled-components';

const Nav = styled.nav`
background-color: rgb(89, 175, 204);
display: flex;
align-items: center;
justify-content: space-between;

h1 {
    margin: 0 20px;
}

.menu {
    display: flex;
    padding-right: 30px;
    align-items: center;
}

.nav-item {
    /* 페이지를 늘렸을 때 nav-item사이의 패딩이 더 증가하도록 어떻게 할 수 있을까? */
    list-style: none;
    padding: 20px;
    cursor: pointer;
}

.nav-item img {
    width:40px;
    height:40px;
    border-radius: 50%;
}
`

function Header({ loginButtonOn, setLoginButtonOn }) {

    //isLogin 여부에 따라서 NavBar에 로그인 버튼만 나타나거나, 다른 메뉴들이 나타남
    const [isLogin, setIsLogin] = useState(true);

    const loginHandler = () => {
        //TODO 로그인 버튼 눌렀을때, 로그인 모달창 띄우기
        setLoginButtonOn(!loginButtonOn)
    }

    
    return (
        <Nav>
            <Link to="/">
                <h1 className="logo">Mentor-to-Mentee</h1>
            </Link>
            {isLogin ?
                <ul className="menu">
                    <li className="nav-item">나의 질문</li>
                    <Link to='/applymentor'>
                        <li className="nav-item">멘토 지원하기</li>
                    </Link>

                    <Link to='/mypage' className="nav-item">
                        <img src="https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-3.jpg" />
                    </Link>
                </ul>
                :
                <ul className="menu">
                    <li className="nav-item" onClick={loginHandler}>Login</li>
                </ul>
            }
        </Nav>
    )
}

export default Header
