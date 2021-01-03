import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const QuestionForm = styled.form`
  margin-left: 50px;
  width: 620px;
  min-height: 600px;
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

  .createdAt {
    margin-top: 20px;
    margin-right: 20px;
    text-align: right;
  }
`;

const AnswerBlock = styled.div`
  border: 1px solid #dee2e6;
  padding: 20px;
  .answer-btn {
    border: 1px solid #dee2e6;
    border-radius: 16px;
    color: white;
    width: 80px;
    padding: 5px;
    text-align: center;
    cursor: pointer;
  }

  .answer-state-true {
    background: green;
  }
  .answer-state-false {
    background: red;
  }

  .answer-content {
    margin-top: 5px;
    padding: 12px;
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

  const answerButtonHandler = () => {
    setAnswerButtonOn(!answerButtonOn);
  };

  const answerInputHandler = event => {
    setAnswerText(event.target.value);
  };
  const submitData = {
    id,
    mentorEmail: user.email,
    answer: answerText,
  };

  const requestSubmitAnswer = event => {
    event.preventDefault();
    axios
      .post('https://localhost:4000/answerQuestion', submitData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then();
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
        <h2>{brief}</h2>
        <div>{question}</div>
        <div className='createdAt'>{createdAt}</div>
      </QuestionBlock>
      <AnswerBlock>
        {answer ? (
          <div
            onClick={answerButtonHandler}
            className='answer-btn answer-state-true'
          >
            답변 완료
          </div>
        ) : (
          <div
            onClick={answerButtonHandler}
            className='answer-btn answer-state-false'
          >
            답변 하기
          </div>
        )}
        {answerButtonOn ? (
          <div>
            <div className='answer-content'>{answer}</div>
          </div>
        ) : (
          ''
        )}
      </AnswerBlock>
      {!answer && answerButtonOn ? (
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
