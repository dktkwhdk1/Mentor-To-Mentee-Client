import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ReceivedQuestion from '../ReceivedQuestion';
import { Link } from 'react-router-dom';

const MyQuestionTemplate = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding-top: 30px;
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
    background: red;
    color: white;
    width: 80px;

    text-align: center;
  }
  .today {
    padding-left: 320px;
  }
`;

const SettingSelector = styled.div`
  width: 120px;
  height: 120px;
  padding-top: 20px;
  padding-right: 20px;

  /*border-radius: 10px;*/
  /*background: #e9ecef;*/

  div {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    font-weight: bold;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
  .sent {
    ${(props) =>
      props.openSentQuestion &&
      css`
        background: #e9ecef;
      `}
  }
  .received {
    ${(props) =>
      props.openReceivedQuestion &&
      css`
        background: #e9ecef;
      `}
  }
`;

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

const MyQuestion = ({ mentorName, mentorCompany, mentorJob }) => {
  const mentorImageSource =
    'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg';
  const questionCount = 1;
  const VVSCount = 2;
  const today = new Date().toLocaleString();
  const [answerState, setAnswerState] = useState('답변대기중'); //! 답변 제출되면 setAnswerState('답변완료')

  const [openReceivedQuestion, setReveivedQuestion] = useState(false);
  const [openSentQuestion, setSentQuestion] = useState(true);

  return (
    <MyQuestionTemplate>
      <SettingSelector
        openSentQuestion={openSentQuestion}
        openReceivedQuestion={openReceivedQuestion}
      >
        <div
          className='sent'
          onClick={() => {
            setSentQuestion(true);
            setReveivedQuestion(false);
          }}
        >
          내가 보낸 질문
        </div>

        <div
          className='received'
          onClick={() => {
            setSentQuestion(false);
            setReveivedQuestion(true);
          }}
        >
          내가 받은 질문
        </div>
      </SettingSelector>
      {openSentQuestion ? (
        <QuestionForm>
          <h1>질문 및 답변</h1>
          <Info>
            VVS는 질문권을 의미합니다. 최초 3개가 충전되며, 멘토에게 답변을 받고
            고맙습니다를 작성하시면 1개씩 자동 충전됩니다.
          </Info>
          <Infoblock>
            <SummaryInfo>
              VVS
              <Number>{VVSCount}개</Number>
            </SummaryInfo>
            <SummaryInfo>
              질문
              <Number>{questionCount}개</Number>
            </SummaryInfo>
          </Infoblock>
          <MentorInfoBlock>
            <img
              className='mentor-img'
              src={mentorImageSource}
              alt='image error'
            />
            <div className='mentor-name'>
              {mentorName}
              <span className='mentor'>멘토</span>
              <br />
              <span className='mentor-company'>{mentorCompany} •</span>
              <span className='mentor-job'>{mentorJob}</span>
            </div>
          </MentorInfoBlock>
          <QuestionBlock>
            <StyledLink to='/QuestionAndAnswer'>
              <h2>프론트엔드, 백엔드의 기술 스택이 궁금합니다.</h2>
            </StyledLink>
            <div>
              뱅크샐러드의 프론트엔드, 백엔드 개발에 사용되는 기술 스택이
              무엇인지 궁금합니다!
            </div>
          </QuestionBlock>
          <AnswerBlock>
            <div className='answer'>{answerState}</div>
            <div className='today'>{today}</div>
          </AnswerBlock>
        </QuestionForm>
      ) : (
        <ReceivedQuestion />
      )}
    </MyQuestionTemplate>
  );
};

export default MyQuestion;
