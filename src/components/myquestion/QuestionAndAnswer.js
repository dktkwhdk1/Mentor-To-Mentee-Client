import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const QandATemplate = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding-top: 30px;
`;

const Form = styled.form`
  width: 620px;
  height: 910px;

  .mentor-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 15px;
    border: 1px solid #dee2e6;
  }
  .introduction {
    color: #8f8f94;
  }
  .middle {
    text-align: center;
    font-weight: bold;
    padding-bottom: 100px;
    padding-top: 90px;
  }
  .askquestion {
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 160px;
    font-size: 16px;
    padding: 10px;
    background: #38d9a9;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }
  .etc {
    padding-top: 10px;
    color: #8f8f94;
    font-size: 13px;
  }
  .date {
    color: red;
    font-weight: bold;
  }
`;

const MentorInfo = styled.div`
  display: flex;
  align-items: center;

  .mentorlogo {
    border: 1px solid #dee2e6;
    border-radius: 16px;
    background: #38d9a9;
    color: white;
    width: 60px;
    height: 20px;

    text-align: center;
    padding-top: 1px;
  }
  .name {
    padding-right: 10px;
  }
`;

const QuestionHeader = styled.div`
  border: 1px solid #dee2e6;
  padding: 10px 10px 10px 20px;
  display: flex;

  .today {
    padding-left: 380px;
  }
`;

const QuestionBlock = styled.div`
  border: 1px solid #dee2e6;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
`;

const QuestionAndAnswer = ({ match }) => {
  const questionInfo = new Array();
  const mentorInfo = new Object();
  const questionState = useSelector(
    state => state.myQuestionReducer.sentQuestion
  );
  questionState.forEach(ele => {
    if (ele.mentorId === Number(match.params.id)) {
      mentorInfo.mentorName = ele.mentorName;
      mentorInfo.mentorCompany = ele.mentorCompany;
      mentorInfo.mentorJob = ele.mentorJob;
      mentorInfo.mentorIntroduction = ele.mentorDescription;
      mentorInfo.mentorImage = ele.mentorImage;
      questionInfo.push({
        brief: ele.brief,
        question: ele.question,
        created: ele.createdAt,
        updated: ele.updatedAt,
      });
    }
  });
  return (
    <QandATemplate>
      <Form>
        <img
          className='mentor-img'
          src={mentorInfo.mentorImage}
          alt='image error'
        />
        <MentorInfo>
          <h2 className='name'>{mentorInfo.mentorName}</h2>
          <div className='mentorlogo'>멘토</div>
        </MentorInfo>
        <div>
          {mentorInfo.mentorCompany} • {mentorInfo.mentorJob}
        </div>
        <br />
        <div className='introduction'>{mentorInfo.mentorIntroduction}</div>
        <br />
        <button className='askquestion'>멘토에게 질문하기</button>
        <br />
        <div className='middle'>------- 나의 질문 및 답변 -------</div>
        {questionInfo.map(question => {
          return (
            <>
              <QuestionHeader>
                <div className='head'>질문</div>
                <div className='today'>{question.created}</div>
              </QuestionHeader>
              <QuestionBlock>
                <h2>{question.brief}</h2>
                <div>{question.question}</div>
              </QuestionBlock>
              <div className='etc'>
                답변받지 못하면 <span className='date'>{question.created}</span>
                에 질문이 자동 취소됩니다.
              </div>
              <br />
            </>
          );
        })}
      </Form>
    </QandATemplate>
  );
};

export default QuestionAndAnswer;
