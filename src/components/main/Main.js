import React, { useEffect } from 'react'
import Card from './Card'
import styled from 'styled-components'
import axios from 'axios'
import { setMentorList } from '../../modules/main'
import { useSelector, useDispatch } from 'react-redux'

//styled component
const MainDiv = styled.main`
margin: 30px 0px;

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

function Main() {
    const mentorList = [{
        "id": 1,
        "mentorEmail": "abc@abc.abc",
        "company": "kakao",
        "department": "개발부서",
        "job": "개발자",
        "position": "대리",
        "career": "전) 쿠팡 팀원, 현) 카카오 개발자",
        "description": "멘토소개",
        "user": { "username": "김코딩", "email": "daff@code.com", "images": "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg" }
    }];
    
    // 멘토 정보 받아와서 store에 저장하기
    const dispatch = useDispatch();
    const requestMentorList = () => {
        axios.get('https://localhost:4000/main', {
            headers: { 'Content-Type': 'application/json' }, withCredentials: true
        })
            .then((res) => {
                dispatch(setMentorList(res.data))
            })
    }

    useEffect(()=> {
        requestMentorList();
    })

    const mentors = useSelector(state => state.mentorListReducer).data

    //Todo 모달 영역 밖 클릭시 모달 닫히는 기능 구현 https://velog.io/@seungdeng17/%EB%AA%A8%EB%8B%AC-%EC%98%81%EC%97%AD-%EB%B0%96-%ED%81%B4%EB%A6%AD%EC%8B%9C-%EC%89%BD%EA%B2%8C-%EB%8B%AB%EA%B8%B0

    return (
        <MainDiv>
            <h2>멘토 리스트</h2>
            <div className="cards-container">
                {mentorList.map((mentorData) => {
                    return <Card className="card" mentorData={mentorData} />
                })}
                {/* <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" />
                <Card className="card" /> */}
            </div>
        </MainDiv>
    )
}

export default Main
