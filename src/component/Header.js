import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Header.css'

function Header() {

    const [isLogin, setIsLogin] = useState(true);
    //isLogin 이 true 이면,  li에 나의질문, 멘토지원하기, 마이페이지 아이콘 띄우기
    //isLogin 이 false 이면, li에 Login만 띄우기

    

    
    const loginHandler = () => {
        //TODO 로그인 버튼 눌렀을때, 로그인 모달창 띄우기
    }

    return (
        <nav>
            <h1 className="logo">Mentor-to-Mentee</h1>
            {isLogin ?
                <ul className="menu">
                    <li className="nav-item">나의 질문</li>
                    <li className="nav-item">멘토 지원하기</li>
                    <li className="nav-item"><Avatar src="https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg" /></li>
                </ul>
                :
                <ul className="menu">
                    <li className="nav-item">Login</li>
                </ul>
            }
        </nav>
    )
}

export default Header
