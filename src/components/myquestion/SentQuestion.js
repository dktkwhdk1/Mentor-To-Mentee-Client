import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
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
  margin-left: 50px;
  width: 620px;
  min-height: 600px;
`;
const Info = styled.div`
  color: #8f8f94;
`;

const Infoblock = styled.div`
  display: flex;
  padding-top: 10px;
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

  const answerStateHandler = () => {
    if (answer) {
      console.log(answer);
      setAnswerState(true);
    }
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
        <div onClick={() => history.push(`/mentorprofile/${mentorId}`)} className='mentor-name'>
          {mentorName}
          <span className='mentor'>멘토</span>
          <br />
          <span className='mentor-company'>{mentorCompany} •</span>
          <span className='mentor-job'>{mentorJob}</span>
        </div>
      </MentorInfoBlock>
      <QuestionBlock>
        <StyledLink to={`/QuestionAndAnswer/${mentorId}`}>
          <h2>{brief}</h2>
        </StyledLink>
        <div>{question}</div>
        <div className='createdAt'>{createdAt}</div>
      </QuestionBlock>
      <AnswerBlock>
        {answerState ? (
          <div className='answer answer-state-true'>답변 완료</div>
        ) : (
          <div className='answer answer-state-false'>답변 대기중</div>
        )}
      </AnswerBlock>
    </div>
  );
};

export default SentQuestion;
