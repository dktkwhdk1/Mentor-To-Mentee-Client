import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Modal from '../ModalMessage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const QuestionForm = styled.form`
  margin: 52px;
  text-align: left;
  display: flex;
  flex-direction: column;

  .to-mentor {
    font-size: 30px;
    font-weight: bold;
  }

  input {
    height: 40px;
  }

  .question-input {
    padding-left: 15px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
  }

  .question-textarea {
    margin: 10px 0px;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    resize: none; /* 크롬 크기조정 없애기 */
  }

  .question-submit {
    background-color: rgb(37, 37, 37);
    border: black 1px solid;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;

    &:hover {
      background-color: #b9a186;
      color: white;
      border: #b9a186 1px solid;
    }
  }
`;

function AskQuestion({ mentor }) {
  const [brief, setBrief] = useState('');
  const [question, setQuestion] = useState('');
  const [loginMessage, setLoginMessage] = useState(false);
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);
  const [modalVisible, setModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBriefInput = event => {
    setBrief(event.target.value);
  };
  const handleQuestionInput = event => {
    setQuestion(event.target.value);
  };

  // 멘티 아이디는 로그인 유저의 멘티아이디 주면되고, 멘토아이디는 지금 들어와있는 프로필페이지에 멘토id 넘겨줘야함.
  const user = useSelector(state => state.userInfoSetting);
  const questionData = {
    email: user.email,
    mentorEmail: mentor.email,
    brief,
    question,
  };

  const requestQuestion = event => {
    event.preventDefault();
    if (!brief || !question) {
      setIsValid(true);
      setModalVisible(true);
    } else {
      setIsValid(false);
      axios
        .post('https://localhost:4000/askQuestion', questionData)
        .then(() => {
          openModal();
        });
    }
  };

  const loginMessageHandler = event => {
    event.preventDefault();
    setLoginMessage(true);
    setModalVisible(true);
  };

  return (
    <QuestionForm>
      <div className='to-mentor'>멘토에게 질문하기</div>
      <h4>멘토님께 궁금한 점을 질문해 보세요.</h4>
      <input
        onChange={handleBriefInput}
        className='question-input'
        type='text'
        placeholder='고민 한줄 요약'
      />
      <h5>
        질문을 구체적으로 작성해주세요
        <br />
        <br />
        예) 영업 직무 취업을 목표로 3개월 계획을 세웠습니다.
        <br />
        예) 외국계 기업에서 좋은 조건으로 인터뷰를 제안하였습니다.
      </h5>
      <textarea
        onChange={handleQuestionInput}
        className='question-textarea'
        name='question'
        placeholder='질문을 작성해주세요.'
        cols='30'
        rows='10'
      ></textarea>
      <input
        onClick={isLogin ? requestQuestion : loginMessageHandler}
        className='question-submit'
        type='submit'
        value='질문 전달하기'
      />
      {modalVisible ? (
        <Modal
          isMiddle={true}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={() => {
            closeModal();
            history.push('/myquestion');
          }}
        >
          {' '}
          멘토에게 질문을 전달하였습니다.
        </Modal>
      ) : (
        ''
      )}
      {loginMessage ? (
        <Modal
          isMiddle={true}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={() => {
            closeModal();
          }}
        >
          {' '}
          로그인이 필요합니다.
        </Modal>
      ) : (
        ''
      )}
      {isValid ? (
        <Modal
          isMiddle={true}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={() => {
            closeModal();
          }}
        >
          {' '}
          모든 정보를 입력해주세요.
        </Modal>
      ) : (
        ''
      )}
    </QuestionForm>
  );
}

export default AskQuestion;
