import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ReceivedQuestion from './ReceivedQuestion';

import { useSelector, useDispatch } from 'react-redux'
import { setSentQuestionAction } from '../../modules/myQuestion'
import SentQuestion from './SentQuestion'
import axios from 'axios';

const MyQuestionTemplate = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding-top: 30px;
  // height: 1200px;
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

const MyQuestion = () => {

  //받은 데이터에 답변이 있으면 답변완료, 없으면 답변 대기중
  const [openReceivedQuestion, setReveivedQuestion] = useState(false);
  const [openSentQuestion, setSentQuestion] = useState(true);

  const userEmail = useSelector(state => state.userInfoSetting.email)
  const [sentQuestionList, setSentQuestionList] = useState('')
  const [receivedQuestionList, setReceivedQuestionList] = useState('')
  const dispatch = useDispatch()

  // 렌더할때 나의 질문 가져오기
  useEffect(() => {
    const requestQuestion = () => {
      axios.post('https://localhost:4000/myquestion', { userEmail }, {
        headers: { 'Content-Type': 'application/json' }, withCredentials: true
      })
        .then((res) => {
          console.log('나의 질문리스트 데이터',res.data.data)
          setSentQuestionList(res.data.data.sentQuestion)
          setReceivedQuestionList(res.data.data.receivedQuestion)
          dispatch(setSentQuestionAction(res.data.data))
        })
    }

    requestQuestion();
  }, [])


  /*
  요청 한번에 둘다받아오기. 
  
  내가 보낸 질문 ::  
  userEmail을 참조하여
  qa 테이블에서 user의 menteeid가 일치하는 모든 데이터 전송받아야함
  data: {
    sentQuestion: {
      "id": "아이디"
      "brief" : "질문 제목",
      "question" : "질문",
      "answer" : "답변",
      "mentorId" : "멘토 id",
      "menteeId" : "멘티 id",
      "createdAt" : "질문이 작성된 시간",
      "updatedAt" : "답변이 작성된 시간",
    }
  }
  --> 클릭하면 해당 멘토의 정보, 프로필 로딩하고 + 질문과 답변 같이 로딩  -> 질문답변 상세페이지임

  내가 받은 질문 ::
  userEmail을 참조하여
  qa 테이블에서 user의 mentorid가 일치하는 모든 데이터 전송받아야함
  data: {
    receivedQuestion: [
      {
        "id" : "아이디"
        "brief" : "질문 제목",
        "question" : "질문",
        "answer" : "답변",
        "mentor" : "멘토 id",
        "menti" : "멘티 id",
        "createdAt" : "질문이 작성된 시간",
        "updatedAt" : "답변이 작성된 시간",
      },
      ...
    ],
    답변이 없으면 답변하기 버튼 활성화,
    답변이 있으면 답변완료 띄우기

    답변하기 버튼 누르면 입력 폼과 답변 전송 버튼 띄우기
  */

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
        <SentQuestion sentQuestionList={sentQuestionList}/> 
      ) : (
          <ReceivedQuestion />
        )}
    </MyQuestionTemplate>
  );
};

export default MyQuestion;
