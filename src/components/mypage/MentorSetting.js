import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setMentorInfo } from '../../modules/roleInfoSetting';
import axios from 'axios';
axios.defaults.withCredentials = true;

const InsertForm = styled.form`
  background: #f8f9fa;
  width: 484px;
  height: 910px;

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
  color: white;
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
      background: #38d9a9;
    `}
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 91.5%;
  font-size: 12px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  background: #38d9a9;
  color: white;

  &:hover {
    cursor: pointer;
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
  const userInfo = useSelector(state => {
    console.log(state);
    return {
      ...state.roleInfoSetting.mentor,
      mentorEmail: state.userInfoSetting.email,
    };
  });
  const dispatch = useDispatch();

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
      console.log('컴포넌트의 상태에 회사정보 없음');
      axios
        .get(
          `https://localhost:4000/mentorInfoSetting/pageload?email=${userInfo.mentorEmail}`
        )
        .then(res => {
          const data = res.data.data;
          console.log(data);
          dispatch(
            setMentorInfo({
              ...userInfo,
              company: data.company,
              department: data.department,
              position: data.position,
              job: data.job,
              description: data.description,
              career: data.career,
            })
          );
        });
    }
    setMentorInfo({ ...userInfo });
    return () => {
      console.log('MentorInfoSetting Component Clean');
    };
  }, []);

  const inputFormHandler = e => {
    setMentorInfoState({ ...mentorInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post('https://localhost:4000/mentorInfoSetting/setMentor', {
        ...mentorInfo,
        mentorEmail: userInfo.mentorEmail,
      })
      .then(res => {
        alert('설정 저장이 완료되었습니다.');
        console.log(res);
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
        autoFocus
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
      <SubmitButton onClick={onSubmitHandler}>수정하기</SubmitButton>
    </InsertForm>
  );
}

export default MentorSetting;
