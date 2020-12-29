import React from 'react';
import styled from 'styled-components';

const QuestionForm = styled.form`
  width: 620px;
  height: 910px;
`;

function ReceivedQuestion() {
  return (
    <QuestionForm>
      <h1>질문 및 답변</h1>
      <div>받은 질문이 없습니다.</div>
    </QuestionForm>
  );
}

export default ReceivedQuestion;
