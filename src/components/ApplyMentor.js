import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ApplyMentorDiv = styled.div`
  text-align: center;
  // height: 750px;

  .mentor-img img {
    width: 500px;
  }
`;
const Title = styled.div`
  margin: 60px 0px;
  font-size: 24px;
`;

const Body = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin: 0px 10px;
  }
`;

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
`;

function ApplyMentor() {
  const [mentorInfo, setMentorInfo] = useState({
    company: '',
    department: '',
    position: '',
    job: '1',
  });
  //TODO Store에서 user 이메일을 가져온다
  const mentorEmail = useSelector(state => state.userInfoSetting.email);
  const isMentor = useSelector(state => state.roleInfoSetting.mentor.company);
  const inputFormHandler = e => {
    setMentorInfo({ ...mentorInfo, [e.target.name]: e.target.value });
  };

  // 멘토 지원하기 버튼 클릭 시 post 요청
  const mentorData = { ...mentorInfo, mentorEmail };
  const requestApplyMentor = event => {
    event.preventDefault();
    if (isMentor) {
      alert('이미 멘토에 지원하셨습니다.');
      setMentorInfo({
        company: '',
        department: '',
        position: '',
        job: '1',
      });
    } else {
      axios.post('https://localhost:4000/applyMentor', mentorData).then(() => {
        alert('멘토 지원이 성공적으로 완료되었습니다.');
        setMentorInfo({
          company: '',
          department: '',
          position: '',
          job: '1',
        });
      });
    }
  };

  return (
    <ApplyMentorDiv>
      <Title>
        <h2>멘토 지원하기</h2>
        <h4>가치 있는 커리어 경험을 공유해 보세요</h4>
      </Title>

      <Body>
        <div className='mentor-img'>
          <img
            src='https://d2ljmlcsal6xzo.cloudfront.net/assets/mentor_hero-fb0fabb03ac9a924cc639d018d7f1520d49c3f0f1bef7ef871a6c5141658a781.jpg'
            alt=''
          />
        </div>
        <Form onsubmit='return false'>
          <input
            name='company'
            value={mentorInfo.company}
            onChange={inputFormHandler}
            type='text'
            placeholder='회사명'
            className='input-item'
          />
          <input
            name='department'
            value={mentorInfo.department}
            onChange={inputFormHandler}
            type='text'
            placeholder='부서'
            className='input-item'
          />
          <input
            name='position'
            value={mentorInfo.position}
            onChange={inputFormHandler}
            type='text'
            placeholder='직급'
            className='input-item'
          />
          <select
            name='job'
            value={mentorInfo.job}
            onChange={inputFormHandler}
            className='input-item'
          >
            <option value='1'>직무를 선택해주세요</option>
            <option value='인사/총무/노무'>인사/총무/노무</option>
            <option value='마케팅/MD'>마케팅/MD</option>
            <option value='홍보/CSR'>홍보/CSR</option>
            <option value='영업/영업관리'>영업/영업관리</option>
            <option value='IT개발'>IT개발</option>
          </select>
          <input
            onClick={requestApplyMentor}
            type='submit'
            value='지원하기'
            className='input-item input-submit'
          />
        </Form>
      </Body>
    </ApplyMentorDiv>
  );
}

export default ApplyMentor;
