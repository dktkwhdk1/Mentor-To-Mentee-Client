import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import QuestionAndAnswer from './QuestionAndAnswer';

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
const QuestionForm = styled.form`
  width: 620px;
  height: 910px;
`;
const Info = styled.div`
  color: #8f8f94;
`;

const Infoblock = styled.div`
  display: flex;
`;

const SummaryInfo = styled.div`
  border: 1px solid #dee2e6;
  margin-right: 5px;
  padding: 3px;
  display: flex;
`;

const Number = styled.span`
  padding-left: 5px;
  color: red;
`;

const MenteeInfoBlock = styled.div`
  border: 1px solid #dee2e6;
  margin-top: 20px;
  padding: 20px;
  display: flex;

  .mentee-name {
    font-size: 22px;
    padding-top: 5px;
    .mentee-grade {
      font-size: 18px;
      padding-top: 8px;
      color: #8f8f94;
    }
    .mentee {
      padding-left: 4px;
      padding-top: 9px;
      font-size: 16px;
      color: #8f8f94;
    }
    .mentee-major {
      font-size: 18px;
      padding-left: 4px;
      color: #8f8f94;
    }
  }

  .mentee-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
    border: 1px solid #dee2e6;
  }
`;

const QuestionBlock = styled.div`
  border: 1px solid #dee2e6;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
`;

const AnswerBlock = styled.div`
  border: 1px solid #dee2e6;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  .answer {
    border: 1px solid #dee2e6;
    border-radius: 16px;
    color: white;
    width: 80px;
    padding: 5px;
    text-align: center;
  }

  .answer-state-true {
    background: green;
  }
  .answer-state-false {
    background: red;
    cursor: pointer;
  }

  .createdAt {
    padding-left: 320px;
  }
`;

const AnswerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .answer-text {
    border: 1px solid #dee2e6;
    padding: 20px;
    width: 93.2%;
    height: 100px;
  }
  .submit {
    margin-top: 10px;
    background-color: rgb(106, 165, 231);
    width: 100px;
  }
`;

function ReceivedQuestion({ receivedQuestionList }) {
  return (
    <QuestionForm>
      <h1>질문 및 답변</h1>
      {receivedQuestionList.length ? (
        <>
          <Infoblock>
            <SummaryInfo>
              질문
              <Number>{receivedQuestionList.length}개</Number>
            </SummaryInfo>
          </Infoblock>
          {receivedQuestionList.map((question, idx) => {
            return <Question key={idx} receivedQuestion={question} />;
          })}
        </>
      ) : (
        <div>받은 질문이 없습니다.</div>
      )}
    </QuestionForm>
  );
}

const Question = ({ receivedQuestion }) => {
  const [answerState, setAnswerState] = useState(false);
  const [answerButtonOn, setAnswerButtonOn] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const user = useSelector(state => state.userInfoSetting);
  const {
    brief,
    question,
    createdAt,
    menteeName,
    menteeMajor,
    menteeGrade,
    menteeId,
    menteeImage,
    answer,
    id,
  } = receivedQuestion;

  const answerStateHandler = () => {
    if (answer) {
      console.log(answer);
      setAnswerState(true);
    }
  };

  useEffect(() => {
    answerStateHandler();
  }, []);

  const answerButtonHandler = () => {
    setAnswerButtonOn(!answerButtonOn);
  };

  const answerInputHandler = event => {
    setAnswerText(event.target.value);
  };
  console.log(user);
  const submitData = {
    id,
    mentorEmail: user.email,
    answer: answerText,
  };

  const requestSubmitAnswer = event => {
    event.preventDefault();
    axios
      .post('https://localhost:4000/answer??', submitData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => console.log(res));
  };

  return (
    <div>
      <MenteeInfoBlock>
        <img
          className='mentee-img'
          src={
            menteeImage
              ? menteeImage
              : 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
          }
          alt='image error'
        />
        <div className='mentee-name'>
          {menteeName}
          <span className='mentee'>멘티</span>
          <br />
          <span className='mentee-major'>{menteeMajor} •</span>
          <span className='mentee-grade'>{menteeGrade}</span>
        </div>
      </MenteeInfoBlock>
      <QuestionBlock>
        <StyledLink to={`/QuestionAndAnswer/${menteeId}`}>
          <h2>{brief}</h2>
        </StyledLink>
        <div>{question}</div>
      </QuestionBlock>
      <AnswerBlock>
        {answerState ? (
          <div className='answer answer-state-true'>답변 완료</div>
        ) : (
          <div
            onClick={answerButtonHandler}
            className='answer answer-state-false'
          >
            답변 하기
          </div>
        )}
        <div className='createdAt'>{createdAt}</div>
      </AnswerBlock>
      {answerButtonOn ? (
        <AnswerForm>
          <textarea
            className='answer-text'
            placeholder='답변 내용을 입력해주세요'
            onChange={answerInputHandler}
          ></textarea>
          <input
            onClick={requestSubmitAnswer}
            type='submit'
            className='submit'
          />
        </AnswerForm>
      ) : (
        ''
      )}
    </div>
  );
};
export default ReceivedQuestion;
