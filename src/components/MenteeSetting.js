import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const InsertForm = styled.form`
  background: #f8f9fa;
  width: 484px;
  height: 726px;

  div {
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 20px;
  }

  h1 {
    padding-left: 20px;
    padding-bottom: 20px;
    padding-right: 10px;
    text-align: center;
  }
`;

const Toggle = styled.button`
  background: #e9ecef;
  margin-bottom: 30px;
  width: 50%;
  height: 30px;

  cursor: pointer;
  color: white;
  border: 1px solid #dee2e6;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.isMentee &&
    css`
      background: #38d9a9;
    `}
  ${(props) =>
    props.isMentor &&
    css`
      background: #38d9a9;
    `}
`;

function MenteeSetting() {
  const [isMentor, setMentor] = useState(false);
  const [isMentee, setMentee] = useState(true);

  return (
    <InsertForm>
      <Toggle
        className='mentee'
        isMentee={isMentee}
        onClick={(e) => {
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
        onClick={(e) => {
          e.preventDefault();
          setMentor(true);
          setMentee(false);
        }}
      >
        멘토 정보
      </Toggle>
      <h1>멘티 정보</h1>
      <div>학교</div>
      <div>전공 *</div>
      <div>재학/졸업</div>
      <div>학년</div>
      <div>스펙</div>
      <div>기타</div>
    </InsertForm>
  );
}

export default MenteeSetting;
