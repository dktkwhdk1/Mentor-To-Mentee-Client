import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const QuestionForm = styled.form`
  margin-left: 30px;
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

const MentorInfoBlock = styled.div`
  border: 1px solid #dee2e6;
  margin-top: 20px;
  padding: 20px;
  display: flex;

  .mentor-name {
    font-size: 22px;
    padding-top: 5px;

    &:hover {
      cursor: pointer;
    }

    .mentor-company {
      font-size: 18px;
      padding-top: 8px;
      color: #8f8f94;
    }
    .mentor {
      padding-left: 4px;
      padding-top: 9px;
      font-size: 16px;
      color: #8f8f94;
    }
    .mentor-job {
      font-size: 18px;
      padding-left: 4px;
      color: #8f8f94;
    }
  }

  .mentor-img {
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
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;

  .answer {
    border: 1px solid #dee2e6;
    border-radius: 4px;
    color: white;
    width: 100px;
    padding: 5px;
    text-align: center;
  }

  .answer-state-true {
    border: 1px solid green;
    background: #32a859;
    width: 200px;
    cursor: pointer;
  }
  .answer-state-false {
    border: 1px solid red;
    background: #e54444;
  }
  .createdAt {
    padding-left: 320px;
  }
  .answer-content {
    margin-top: 20px;
  }
`;

function SentQuestion({ sentQuestionList }) {
  return (
    <QuestionForm>
      <h1>질문 및 답변</h1>
      {sentQuestionList.length ? (
        <>
          <Infoblock>
            <SummaryInfo>
              질문
              <Number>{sentQuestionList.length}개</Number>
            </SummaryInfo>
          </Infoblock>
          {sentQuestionList.map((question, idx) => {
            return <Question key={idx} sentQuestion={question} />;
          })}
        </>
      ) : (
        <div>보낸 질문이 없습니다.</div>
      )}
    </QuestionForm>
  );
}

const Question = ({ sentQuestion }) => {
  const [answerButtonOn, setAnswerButtonOn] = useState(false);
  const [answerState, setAnswerState] = useState(false);
  const history = useHistory();
  const {
    brief,
    question,
    createdAt,
    mentorId,
    mentorName,
    mentorCompany,
    mentorJob,
    mentorImage,
    answer,
  } = sentQuestion;

  let questionDate = '';
  for (let i = 0; i < createdAt.length; i++) {
    if (createdAt[i] === 'T') {
      questionDate += ' ';
    } else if (createdAt[i] === '.') {
      break;
    } else questionDate += createdAt[i];
  }

  const answerButtonHandler = () => {
    setAnswerButtonOn(!answerButtonOn);
  };
  const answerStateHandler = () => {
    if (answer) setAnswerState(true);
  };

  useEffect(() => {
    answerStateHandler();
  }, []);

  return (
    <div>
      <MentorInfoBlock>
        <img
          className='mentor-img'
          src={
            mentorImage
              ? mentorImage
              : 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
          }
          alt='image error'
        />
        <div
          onClick={() => history.push(`/mentorprofile/${mentorId}`)}
          className='mentor-name'
        >
          {mentorName}
          <span className='mentor'>멘토</span>
          <br />
          <span className='mentor-company'>{mentorCompany} •</span>
          <span className='mentor-job'>{mentorJob}</span>
        </div>
      </MentorInfoBlock>
      <QuestionBlock>
        <h2>{brief}</h2>
        <div>{question}</div>
        <div className='createdAt'>{questionDate}</div>
      </QuestionBlock>
      <AnswerBlock>
        {answerState ? (
          <>
            <div
              className='answer answer-state-true'
              onClick={answerButtonHandler}
            >
              답변이 도착했습니다!
            </div>
          </>
        ) : (
          <div className='answer answer-state-false'>답변 대기중</div>
        )}
        {answerButtonOn ? (
          <div>
            <div className='answer-content'>{answer}</div>
          </div>
        ) : (
          ''
        )}
      </AnswerBlock>
    </div>
  );
};

export default SentQuestion;
