import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'

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
  background-color: rgb(106,165,231); 
  width: 100px;
}
`
function ReceivedQuestion({ receivedQuestionList }) {
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
      menteeName: '조영권',
      menteeMajor: '영어영문학과',
      menteeGrade: '2학년',
      menteeGraduation: '재학',
      menteeImage: 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
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
      menteeName: '강희석',
      menteeMajor: '컴퓨터공학과',
      menteeGrade: '3학년',
      menteeGraduation: '재학',
      menteeImage: 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
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
      menteeName: '김코딩',
      menteeMajor: '생명공학과',
      menteeGrade: '2학년',
      menteeGraduation: '졸업',
      menteeImage: 'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
    }
  ]
  return (
    <QuestionForm>
      <h1>질문 및 답변</h1>
      <div>받은 질문이 없습니다.</div>
      <Infoblock>
        <SummaryInfo>질문
            <Number>{dummyData.length}개</Number>
        </SummaryInfo>
      </Infoblock>

      {dummyData.map((question) => {
        return <Question receivedQuestion={question} />
      })}

    </QuestionForm>
  );
}

const Question = ({ receivedQuestion }) => {
  const [answerState, setAnswerState] = useState(false);
  const [answerButtonOn, setAnswerButtonOn] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const user = useSelector(state => state.userInfoSetting);
  const { brief, question, createdAt, menteeName, menteeMajor, menteeGrade, menteeGraduation, menteeImage, answer, id } = receivedQuestion

  const answerStateHandler = () => {
    if (answer) {
      console.log(answer)
      setAnswerState(true)
    }
  }

  useEffect(() => {
    answerStateHandler();
  }, [])

  const answerButtonHandler = () => {
    setAnswerButtonOn(!answerButtonOn)
  }

  const answerInputHandler = (event) => {
    setAnswerText(event.target.value)
  }
  console.log(user)
  const submitData = {
    id,
    mentorEmail: user.email,
    answer: answerText,
  }

  const requestSubmitAnswer = (event) => {
    event.preventDefault();
    axios.post('https://localhost:4000/answer??', submitData, {
      headers: { 'Content-Type': 'application/json' }, withCredentials: true
    })
    .then((res) => console.log(res))
  }

  return (
    <div>
      <MenteeInfoBlock>
        <img
          className='mentee-img'
          src={menteeImage}
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
          <div onClick={answerButtonHandler} className='answer answer-state-false'>답변 하기</div>
        }
        <div className='createdAt'>{createdAt}</div>
      </AnswerBlock>
      {answerButtonOn ?
        <AnswerForm>
          <textarea className="answer-text" placeholder='답변 내용을 입력해주세요' onChange={answerInputHandler}></textarea>
          <input onClick={requestSubmitAnswer} type="submit" className="submit" />
        </AnswerForm>
        : ''
      }


    </div>
  )
}
export default ReceivedQuestion;
