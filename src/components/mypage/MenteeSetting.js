import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import MentorSetting from './MentorSetting';
import { useSelector, useDispatch } from 'react-redux';
import { setMenteeInfo } from '../../modules/menteeInfoSetting';
import axios from 'axios';
axios.defaults.withCredentials = true;

const InsertForm = styled.form`
  background: #f8f9fa;
  width: 484px;
  height: 830px;

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

// 멘티 정보, 멘토 정보 버튼
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

const Input = styled.input`
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
  height: 100px;
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

function MenteeSetting() {
  const [isMentor, setMentor] = useState(false);
  const [isMentee, setMentee] = useState(true);
  const [menteeInfo, setMenteeInfoState] = useState({
    school: '',
    major: '',
    graduate: '1',
    grade: '1',
    spec: '',
    etc: '',
  });
  const userInfo = useSelector(state => ({ ...state.menteeInfoSetting }));
  if (!menteeInfo.school) {
    console.log('상태에 저장된 학교 정보가 없음, 받아와서 상태에 저장하세요');
    //axios.get('https://localhost:4000/getmentee');
  } else {
    console.log(userInfo);
  }
  const dispatch = useDispatch();
  const inputFormHandler = e => {
    setMenteeInfoState({ ...menteeInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = e => {
    e.preventDefault();
    /*
    axios
      .post('https://localhost:4000/setmentee', {
        ...menteeInfo
      })
      .then(res => console.log(res));*/

    // then 안에 넣어야함
    alert('설정 저장이 완료되었습니다.');
    dispatch(setMenteeInfo({ ...menteeInfo }));
    console.log(userInfo);
  };
  // line 146, autoFocus - 페이지 들어가자마자 해당 input에 커서 깜빡임
  return isMentor ? (
    <MentorSetting
      isMentee={isMentee}
      isMentor={isMentor}
      setMentee={setMentee}
      setMentor={setMentor}
    />
  ) : (
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
      <h1>멘티 정보</h1>
      <div>학교</div>
      <Input
        autoFocus
        placeholder='학교를 작성해주세요.'
        name='school'
        value={menteeInfo.school}
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
          name='graduate'
          value={menteeInfo.graduate}
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
      <div>스펙</div>
      <BigInput
        placeholder='스펙을 작성해주세요.'
        name='spec'
        value={menteeInfo.spec}
        onChange={inputFormHandler}
      />
      <div>기타</div>
      <BigInput
        placeholder='기타 관심 분야 등 멘토님이 답변에 참고할 만한 사항을 작성해주세요.'
        name='etc'
        value={menteeInfo.etc}
        onChange={inputFormHandler}
      />
      <SubmitButton onClick={onSubmitHandler}>수정하기</SubmitButton>
    </InsertForm>
  );
}

export default MenteeSetting;
