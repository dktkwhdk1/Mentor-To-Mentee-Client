import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ReceivedQuestion from './ReceivedQuestion';

import { useSelector, useDispatch } from 'react-redux';
import { setSentQuestionAction } from '../../modules/myQuestion';
import SentQuestion from './SentQuestion';
import axios from 'axios';
axios.defaults.withCredentials = true;

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
    ${props =>
      props.openSentQuestion &&
      css`
        background: #e9ecef;
      `}
  }
  .received {
    ${props =>
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

  const userEmail = useSelector(state => state.userInfoSetting.email);
  const [sentQuestionList, setSentQuestionList] = useState([]);
  const [receivedQuestionList, setReceivedQuestionList] = useState([]);
  const dispatch = useDispatch();

  // 렌더할때 나의 질문 가져오기
  useEffect(() => {
    const requestQuestion = () => {
      axios
        .get(`https://localhost:4000/getQuestion?email=${userEmail}`)
        .then(res => {
          console.log('나의 질문리스트 데이터', res.data.data);
          if (res.data) {
            const data = res.data.data;

            setSentQuestionList([...data.sentQuestion]);
            setReceivedQuestionList([...data.receivedQuestion]);
            dispatch(
              setSentQuestionAction({
                sentQuestion: data.sentQuestion,
                receivedQuestion: data.receivedQuestion,
              })
            );
          }
        });
    };
    requestQuestion();
  }, []);
  

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
        <SentQuestion sentQuestionList={sentQuestionList} />
      ) : (
        <ReceivedQuestion receivedQuestionList={receivedQuestionList} />
      )}
    </MyQuestionTemplate>
  );
};

export default MyQuestion;
