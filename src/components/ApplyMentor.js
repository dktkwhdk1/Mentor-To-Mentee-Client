import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux'

const ApplyMentorDiv = styled.div`
text-align: center;
// height: 750px;

.mentor-img img {
    width: 500px;
}
`
const Title = styled.div`
margin: 60px 0px;
font-size: 24px;
`

const Body = styled.div`
margin: 30px 0px;
display: flex;
justify-content: center;
align-items: center;;

div {
    margin: 0px 10px;
}
`

const Form = styled.form`
width: 400px;
height: 400px;
background-color: #f8f9fa;
display: flex;
flex-direction: column;
justify-content: center;

.input-item {
    height: 30px;
    padding: 0;
    padding-left: 10px;
    margin: 20px;
}

.input-submit {
    background-color: rgb(106, 165, 231);
    cursor: pointer;
    height: 35px;
}
`

function ApplyMentor() {
    const [company, setCompany] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [job, setJob] = useState('');
    //TODO Store에서 user 이메일을 가져온다
    const mentorEmail = useSelector(state => state.userInfoSetting.email)

    const handleCompanyInput = (event) => { setCompany(event.target.value) }
    const handleDepartmentInput = (event) => { setDepartment(event.target.value) }
    const handlePositionInput = (event) => { setPosition(event.target.value) }
    const handleJobInput = (event) => { setJob(event.target.value) }

    // 멘토 지원하기 버튼 클릭 시 post 요청
    const mentorData = { mentorEmail, company, department, position, job }
    const requestApplyMentor = (event) => {
        axios.post("https://localhost:4000/applyMentor", mentorData, {
            headers: { 'Content-Type': 'application/json' }, withCredentials: true
        })
            .then((res) => console.log(res))
        // form 태그 새로고침 방지
        event.preventDefault();
    }

    return (
        <ApplyMentorDiv>
            <Title>
                <h2>멘토 지원하기</h2>
                <h4>가치 있는 커리어 경험을 공유해 보세요</h4>
            </Title>

            <Body>
                <div className="mentor-img">
                    <img src="https://d2ljmlcsal6xzo.cloudfront.net/assets/mentor_hero-fb0fabb03ac9a924cc639d018d7f1520d49c3f0f1bef7ef871a6c5141658a781.jpg" alt="" />
                </div>
                <Form onsubmit="return false">
                    <input onChange={handleCompanyInput} type="text" placeholder="회사명" className="input-item" />
                    <input onChange={handleDepartmentInput} type="text" placeholder="부서" className="input-item" />
                    <input onChange={handlePositionInput} type="text" placeholder="직급" className="input-item" />
                    <select onChange={handleJobInput} className="input-item">
                        <option value="직무를 선택해주세요">직무를 선택해주세요</option>
                        <option value="인사/총무/노무">인사/총무/노무</option>
                        <option value="마케팅/MD">마케팅/MD</option>
                        <option value="홍보/CSR">홍보/CSR</option>
                        <option value="영업/영업관리">영업/영업관리</option>
                        <option value="IT개발">IT개발</option>
                    </select>
                    <input onClick={requestApplyMentor} type="submit" value="지원하기" className="input-item input-submit" />
                </Form>
            </Body>
        </ApplyMentorDiv>
    )
}



export default ApplyMentor
