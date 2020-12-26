import React, {useState} from 'react'
import Card from './Card'
import Login from './Login'
import Signup from './Signup'
import styled from 'styled-components';

//styled component
const MainDiv = styled.main`
margin-top: 30px;

h2 {
    text-align: center;
}

.cards-container {
    display: flex;
    justify-content: space-around;
    align-content: flex-end ;   
    flex-wrap: wrap;
}

.card {
    margin: 30px;
}
`

function Main({loginButtonOn, setLoginButtonOn}) {

    console.log(loginButtonOn)
    const [signupButtonOn, setSignupButtonOn] = useState(false)

    //Todo 모달 영역 밖 클릭시 모달 닫히는 기능 구현 https://velog.io/@seungdeng17/%EB%AA%A8%EB%8B%AC-%EC%98%81%EC%97%AD-%EB%B0%96-%ED%81%B4%EB%A6%AD%EC%8B%9C-%EC%89%BD%EA%B2%8C-%EB%8B%AB%EA%B8%B0

    return (
        <MainDiv>
            {signupButtonOn? <Signup setLoginButtonOn={setLoginButtonOn} setSignupButtonOn={setSignupButtonOn}></Signup> : ''}
            <h2>멘토 리스트</h2>
            {loginButtonOn? <Login setLoginButtonOn={setLoginButtonOn} signupButtonOn={signupButtonOn} setSignupButtonOn={setSignupButtonOn}/>: ''}
            <div className="cards-container">
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
                <Card className="card"/>
            </div>
        </MainDiv>
    )
}

export default Main
