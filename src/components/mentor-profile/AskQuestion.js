import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

const QuestionForm = styled.form`
  margin: 50px;

  text-align: left;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
  }

  .question-input {
    margin: 10px 0px;
  }

  .question-submit {
    background-color: rgb(37, 37, 37);
    border: black 1px solid;
    color: white;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #b9a186;
      color: white;
      border: #b9a186 1px solid;
    }
  }
`;

function AskQuestion({ mentor }) {
  const [brief, setBrief] = useState('');
  const [question, setQuestion] = useState('');
  const [loginMessage, setLoginMessage] = useState(false);
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);

  const handleBriefInput = event => {
    setBrief(event.target.value);
  };
  const handleQuestionInput = event => {
    setQuestion(event.target.value);
  };

  // 멘티 아이디는 로그인 유저의 멘티아이디 주면되고, 멘토아이디는 지금 들어와있는 프로필페이지에 멘토id 넘겨줘야함.
  const user = useSelector(state => state.userInfoSetting);
  const questionData = {
    email: user.email,
    mentorEmail: mentor.email,
    brief,
    question,
  };

  const requestQuestion = event => {
    event.preventDefault();
    axios.post('https://localhost:4000/askQuestion', questionData);
    //TODO 질문하고 나서 질문 상세 페이지로 넘어가기
  };

  const loginMessageHandler = event => {
    event.preventDefault();
    setLoginMessage(true);
  };
  return (
    <QuestionForm>
      <h2>멘토에게 질문하기</h2>
      <h4>멘토님께 궁금한 점을 질문해 보세요.</h4>
      <input
        onChange={handleBriefInput}
        className='question-input'
        type='text'
        placeholder='고민 한줄 요약'
      />

      <h5>
        질문을 구체적으로 작성해주세요
        <br />
        예) 영업 직무 취업을 목표로 3개월 계획을 세웠습니다.
        <br />
        예) 외국계 기업에서 좋은 조건으로 인터뷰를 제안하였습니다.
      </h5>
      <textarea
        onChange={handleQuestionInput}
        className='question-input'
        name='question'
        placeholder='질문을 작성해주세요.'
        cols='30'
        rows='10'
      ></textarea>
      <input
        onClick={isLogin ? requestQuestion : loginMessageHandler}
        className='question-input question-submit'
        type='submit'
        value='질문 전달하기'
      />
      {loginMessage ? <div>로그인을 해주세요</div> : ''}
    </QuestionForm>
  );
}
export default AskQuestion;
