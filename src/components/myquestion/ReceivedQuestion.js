import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../ModalMessage';
import { setSentQuestionAction } from '../../modules/myQuestion';
import axios from 'axios';
axios.defaults.withCredentials = true;

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
    border-radius: 4px;
    color: white;
    width: 100px;
    padding: 5px;
    text-align: center;
    cursor: pointer;
  }

  .answer-state-true {
    border: 1px solid green;
    background: #32a859;
    cursor: pointer;
  }

  .answer-state-false {
    border: 1px solid red;
    background: #e54444;
  }

  .answer-content {
    margin-top: 20px;
    margin-left: 5px;
  }
`;

const AnswerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .answer-text {
    border: 1px solid #dee2e6;
    padding: 20px;
    width: 578px;
    height: 120px;
    resize: none; /* 크롬 크기조정 없애기 */
  }

  .submit {
    margin-top: 10px;
    background: rgb(37, 37, 37);
    border: 1px solid rgb(37, 37, 37);
    height: 30px;
    color: white;
    width: 150px;
    &:hover {
      cursor: pointer;
      background-color: #b9a186;
      border: #b9a186 1px solid;
    }
  }
`;

function ReceivedQuestion({ receivedQuestionList, setReceivedQuestionList }) {
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
            return (
              <Question
                key={idx}
                receivedQuestion={question}
                setReceivedQuestionList={setReceivedQuestionList}
              />
            );
          })}
        </>
      ) : (
        <div>받은 질문이 없습니다.</div>
      )}
    </QuestionForm>
  );
}

const Question = ({ receivedQuestion, setReceivedQuestionList }) => {
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
    menteeImage,
    answer,
    id,
  } = receivedQuestion;
  const dispatch = useDispatch();

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

  const answerInputHandler = event => {
    setAnswerText(event.target.value);
  };
  const submitData = {
    id,
    mentorEmail: user.email,
    answer: answerText,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    answerButtonHandler();
    axios
      .get(`https://localhost:4000/getQuestion?email=${user.email}`)
      .then(res => {
        if (res.data) {
          const data = res.data.data;
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

  const requestSubmitAnswer = e => {
    e.preventDefault();
    axios
      .post('https://localhost:4000/answerQuestion', submitData)
      .then(res => {
        if (res.status === 200) {
          openModal();
        }
      });
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
          alt=''
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
        <div className='createdAt'>{questionDate}</div>
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
        {answer && answerButtonOn ? (
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
            placeholder='답변 내용을 입력해주세요.'
            onChange={answerInputHandler}
          ></textarea>
          <input
            onClick={requestSubmitAnswer}
            type='submit'
            className='submit'
            value={'답변 제출하기'}
          />
          {modalVisible ? (
            <Modal
              isMiddle={true}
              visible={modalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeModal}
            >
              답변을 성공적으로 제출했습니다.
            </Modal>
          ) : (
            ''
          )}
        </AnswerForm>
      ) : (
        ''
      )}
    </div>
  );
};

export default ReceivedQuestion;
