import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setMentorInfo } from '../../modules/roleInfoSetting';
import Modal from '../ModalMessage';
import axios from 'axios';
axios.defaults.withCredentials = true;

const InsertForm = styled.form`
  border: 1px solid #dee2e6;
  width: 484px;
  height: 895px;

  div {
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 20px;
  }

  h1 {
    padding-left: 20px;
    padding-bottom: 10px;
    padding-right: 10px;
    text-align: center;
  }
`;

const Toggle = styled.button`
  background: #e9ecef;
  margin-bottom: 20px;
  width: 50%;
  height: 30px;

  cursor: pointer;
  border: 1px solid #dee2e6;
  &:hover {
    cursor: pointer;
  }
  ${props =>
    props.isMentee &&
    css`
      background: #38d9a9;
    `}
  ${props =>
    props.isMentor &&
    css`
      background: rgb(37, 37, 37);
      color: white;
    `}
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  border: 1px solid rgb(37, 37, 37);
  width: 91.5%;
  font-size: 12px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  background: rgb(37, 37, 37);
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #b9a186;
    border: #b9a186 1px solid;
  }
`;

const BigInput = styled.textarea`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 87%;
  height: 100px;
  font-size: 12px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  resize: none; /* 크롬 크기조정 없애기 */
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 87%;
  font-size: 12px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
`;

function MentorSetting({ isMentee, isMentor, setMentee, setMentor }) {
  const userInfo = useSelector(state => ({
    ...state.roleInfoSetting.mentor,
    mentorEmail: state.userInfoSetting.email,
  }));
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const [mentorInfo, setMentorInfoState] = useState({
    company: '',
    department: '',
    position: '',
    job: '',
    description: '',
    career: '',
  });

  useEffect(() => {
    if (!userInfo.company) {
      axios
        .get(
          `https://localhost:4000/mentorInfoSetting/pageload?email=${userInfo.mentorEmail}`
        )
        .then(res => {
          const data = res.data.data;
          setMentorInfoState({
            ...mentorInfo,
            company: data.company || '',
            department: data.department || '',
            position: data.position || '',
            job: data.job || '',
            description: data.description || '',
            career: data.career || '',
          });
          dispatch(
            setMentorInfo({
              ...userInfo,
              company: data.company || '',
              department: data.department || '',
              position: data.position || '',
              job: data.job || '',
              description: data.description || '',
              career: data.career || '',
            })
          );
        });
    }
    setMentorInfoState({ ...mentorInfo, ...userInfo });
    return;
  }, []);

  const inputFormHandler = e => {
    setMentorInfoState({ ...mentorInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = () => {
    axios
      .post('https://localhost:4000/mentorInfoSetting/setMentor', {
        ...mentorInfo,
        mentorEmail: userInfo.mentorEmail,
      })
      .then(() => {
        dispatch(setMentorInfo({ ...mentorInfo }));
      });
  };
  return (
    <InsertForm>
      <Toggle
        className='mentee'
        isMentee={isMentee}
        onClick={e => {
          e.preventDefault();
          setMentor(false);
          setMentee(true);
        }}
      >
        멘티 정보
      </Toggle>
      <Toggle
        className='mentor'
        isMentor={isMentor}
        onClick={e => {
          e.preventDefault();
          setMentor(true);
          setMentee(false);
        }}
      >
        멘토 정보
      </Toggle>
      <h1>멘토 정보</h1>
      <div>회사명*</div>
      <Input
        placeholder='회사명을 작성해주세요.'
        name='company'
        value={mentorInfo.company}
        onChange={inputFormHandler}
      ></Input>
      <div>부서</div>
      <Input
        placeholder='부서명을 작성해주세요.'
        name='department'
        value={mentorInfo.department}
        onChange={inputFormHandler}
      ></Input>
      <div>직급</div>
      <Input
        placeholder='직급을 작성해주세요.'
        name='position'
        value={mentorInfo.position}
        onChange={inputFormHandler}
      ></Input>
      <div>직무*</div>
      <Input
        placeholder='직무를 작성해주세요.'
        name='job'
        value={mentorInfo.job}
        onChange={inputFormHandler}
      ></Input>
      <div>멘토 소개*</div>
      <BigInput
        placeholder='기타 관심 분야 등 멘티들이 참고할 만한 사항을 작성해주세요.'
        name='description'
        value={mentorInfo.description}
        onChange={inputFormHandler}
      ></BigInput>
      <div>주요 경력</div>
      <BigInput
        placeholder='주요 경력을 작성해주세요.'
        name='career'
        value={mentorInfo.career}
        onChange={inputFormHandler}
      ></BigInput>
      <SubmitButton
        onClick={e => {
          e.preventDefault();
          onSubmitHandler();
          openModal();
        }}
      >
        수정하기
      </SubmitButton>
      {modalVisible ? (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          멘토 정보 설정이 완료되었습니다.
        </Modal>
      ) : (
        ''
      )}
    </InsertForm>
  );
}

export default MentorSetting;
