import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

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
//   height: 910px;
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
    const dummyData = [
        {
            id: 1,
            brief: '프론트엔드, 백엔드의 기술 스택이 궁금합니다.',
            question: '뱅크샐러드의 프론트엔드, 백엔드 개발에 사용되는 기술 스택이 무엇인지 궁금합니다!',
            answer: null,
            mentorId: 3,
            menteeId: 1,
            createdAt: '2020-12-29 15:42:26',
            updatedAt: '2020-12-29 15:42:26',
            mentorName: '조영권',
            mentorCompany: '카카오',
            mentorJob: '개발자',
            mentorImage: 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
        },
        {
            id: 2,
            brief: '취업하려면 어떻게해야되나요?',
            question: '궁금쓰',
            answer: '알아서 잘 하세요',
            mentorId: 2,
            menteeId: 5,
            createdAt: '2020-12-22 15:42:26',
            updatedAt: '2020-12-22 15:42:26',
            mentorName: '강희석',
            mentorCompany: '네이버',
            mentorJob: '개발자',
            mentorImage: 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
        },
        {
            id: 3,
            brief: '질문잇슴다',
            question: '개발 잘하는 법좀 알려주세요',
            answer: '졸라 하면 됨',
            mentorId: 4,
            menteeId: 1,
            createdAt: '2020-12-25 15:42:26',
            updatedAt: '2020-12-25 15:42:26',
            mentorName: '김코딩',
            mentorCompany: '쿠팡',
            mentorJob: '개발자',
            mentorImage: 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
        }
    ]

    const VVSCount = 2;

    return (
        <QuestionForm>
            <h1>질문 및 답변</h1>
            <Info>
                VVS는 질문권을 의미합니다. 최초 3개가 충전되며, 멘토에게 답변을 받고
                고맙습니다를 작성하시면 1개씩 자동 충전됩니다.
          </Info>
            <Infoblock>
                <SummaryInfo>VVS
                    <Number>{VVSCount}개</Number>
                </SummaryInfo>
                <SummaryInfo>질문
                    <Number>{dummyData.length}개</Number>
                </SummaryInfo>
            </Infoblock>

            {dummyData.map((question) => {
                return <Question sentQuestion={question} />
            })}
        </QuestionForm>
    )

}


const Question = ({ sentQuestion }) => {
    const [answerState, setAnswerState] = useState(false)
    const { brief, question, createdAt, mentorName, mentorCompany, mentorJob, mentorImage, answer } = sentQuestion

    const answerStateHandler = () => {
        if (answer) {
          console.log(answer)
          setAnswerState(true)
        }
      }
    
      useEffect(() => {
        answerStateHandler();
      }, [])

    return (
        <div>
            <MentorInfoBlock>
                <img
                    className='mentor-img'
                    src={mentorImage}
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
                    <h2>{brief}</h2>
                </StyledLink>
                <div>
                    {question}
                </div>
            </QuestionBlock>
            <AnswerBlock>
                {answerState ? 
                <div className='answer answer-state-true'>답변 완료</div>
                :
                <div className='answer answer-state-false'>답변 대기중</div>
                }
                <div className='createdAt'>{createdAt}</div>
            </AnswerBlock>
        </div>
    )
}

export default SentQuestion
