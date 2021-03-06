import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import MentorSetting from './MentorSetting';
import { useSelector, useDispatch } from 'react-redux';
import { setMenteeInfo } from '../../modules/roleInfoSetting';
import Modal from '../ModalMessage';
import axios from 'axios';
axios.defaults.withCredentials = true;

const InsertForm = styled.form`
  border: 1px solid #dee2e6;
  width: 484px;
  height: 770px;

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
  color: black;
  border: 1px solid #dee2e6;
  &:hover {
    cursor: pointer;
    background: rgb(37, 37, 37);
    color: white;
  }

  ${props =>
    props.isMentee &&
    css`
      background: rgb(37, 37, 37);
      color: white;
    `}
  ${props =>
    props.isMentor &&
    css`
      background: #38d9a9;
    `}
`;

export const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 87%;
  font-size: 12px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
`;

const BigInput = styled.textarea`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 87%;
  height: 230px;
  font-size: 12px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  resize: none; /* 크롬 크기조정 없애기 */
`;

const Select = styled.select`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 47.5%;
  color: gray;

  margin-bottom: 5px;
  font-size: 12px;
  padding: 10px;

  option {
    color: black;
    min-height: 20px;
  }
`;

const Graduation = styled.div`
  display: flex;
  word-spacing: 150px;
`;

export const SubmitButton = styled.button`
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

function MenteeSetting({ AreYouMentor }) {
  const userInfo = useSelector(state => ({
    ...state.roleInfoSetting.mentee,
    menteeEmail: state.userInfoSetting.email,
  }));
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const [isMentor, setMentor] = useState(false);
  const [isMentee, setMentee] = useState(true);
  const [menteeInfo, setMenteeInfoState] = useState({
    uni: '',
    major: '',
    graduation: '1',
    grade: '1',
    menteeDescription: '',
  });

  useEffect(() => {
    if (!userInfo.uni) {
      axios
        .get(
          `https://localhost:4000/menteeInfoSetting/pageload?email=${userInfo.menteeEmail}`
        )
        .then(res => {
          const data = res.data.data;
          setMenteeInfoState({
            ...menteeInfo,
            uni: data.uni || '',
            major: data.major || '',
            graduation: data.graduation || '',
            grade: data.grade || '',
            menteeDescription: data.menteeDescription || '',
          });
          dispatch(
            setMenteeInfo({
              ...userInfo,
              uni: data.uni || '',
              major: data.major || '',
              graduation: data.graduation || '',
              grade: data.grade || '',
              menteeDescription: data.menteeDescription || '',
            })
          );
        });
    }
    setMenteeInfoState({ ...menteeInfo, ...userInfo });
    return;
    // eslint-disable-next-line
  }, []);
  const inputFormHandler = e => {
    setMenteeInfoState({ ...menteeInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = () => {
    axios
      .post('https://localhost:4000/menteeInfoSetting/setMentee', {
        ...menteeInfo,
        menteeEmail: userInfo.menteeEmail,
      })
      .then(() => {
        dispatch(setMenteeInfo({ ...menteeInfo }));
      });
  };

  return isMentor ? (
    <MentorSetting
      isMentee={isMentee}
      isMentor={isMentor}
      setMentee={setMentee}
      setMentor={setMentor}
    />
  ) : (
    <InsertForm>
      {AreYouMentor ? (
        <>
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
        </>
      ) : (
        ''
      )}
      <h1>멘티 정보</h1>
      <div>학교</div>
      <Input
        placeholder='학교를 작성해주세요.'
        name='uni'
        value={menteeInfo.uni}
        onChange={inputFormHandler}
      />
      <div>전공*</div>
      <Input
        placeholder='전공을 작성해주세요.'
        name='major'
        value={menteeInfo.major}
        onChange={inputFormHandler}
      />
      <Graduation>재학/졸업* 학년</Graduation>
      <Graduation>
        <Select
          name='graduation'
          value={menteeInfo.graduation}
          onChange={inputFormHandler}
        >
          <option value='1'>선택해주세요</option>
          <option value='2'>재학</option>
          <option value='3'>졸업</option>
          <option value='4'>기타</option>
        </Select>
        <Select
          name='grade'
          value={menteeInfo.grade}
          onChange={inputFormHandler}
        >
          <option value='1'>재학생만 선택해주세요.</option>
          <option value='2'>1학년</option>
          <option value='3'>2학년</option>
          <option value='4'>3학년</option>
          <option value='5'>4학년</option>
        </Select>
      </Graduation>
      <div>멘티 소개</div>
      <BigInput
        placeholder='스펙, 관심 분야 등 멘토님이 답변에 참고할 만한 사항을 작성해주세요.'
        name='menteeDescription'
        value={menteeInfo.menteeDescription}
        onChange={inputFormHandler}
      />
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
          멘티 정보 설정이 완료되었습니다.
        </Modal>
      ) : (
        ''
      )}
    </InsertForm>
  );
}

export default MenteeSetting;
