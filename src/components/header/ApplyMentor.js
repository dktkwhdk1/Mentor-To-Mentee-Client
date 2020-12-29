import React from 'react';
import styled from 'styled-components';
// import './ApplyMentor.css'

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
        <Form>
          <input type='text' placeholder='회사명' className='input-item' />
          <input type='text' placeholder='부서' className='input-item' />
          <input type='text' placeholder='직급' className='input-item' />
          <select className='input-item'>
            <option value='1'>직무를 선택해주세요</option>
            <option value='2'>인사/총무/노무</option>
            <option value='3'>마케팅/MD</option>
            <option value='4'>홍보/CSR</option>
            <option value='5'>영업/영업관리</option>
            <option value='6'>IT개발</option>
          </select>
          <input
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
