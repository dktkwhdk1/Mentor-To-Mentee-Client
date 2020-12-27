import React from 'react';
import styled from 'styled-components';
// import './AskQuestion.css'

const QuestionForm = styled.form`
margin: auto;
width: 400px;
text-align: left;
display: flex;
flex-direction: column;

input {
    height: 40px;
}

.question-input {
    margin: 10px 0px;
}

.question-submit {
    background-color: rgb(106, 165, 231);
    cursor: pointer;
    border-radius: 5px;
}
`

function AskQuestion() {
    return (
        <QuestionForm>
            <h2>멘토에게 질문하기</h2>
            <h4>멘토님께 궁금한 점을 질문해 보세요.</h4>
            <input className="question-input" type="text" placeholder="고민 한줄 요약"/>
  
            <h5>질문을 구체적으로 작성해주세요<br/>예) 영업 직무 취업을 목표로 3개월 계획을 세웠습니다.<br/>예) 외국계 기업에서 좋은 조건으로 인터뷰를 제안하였습니다.</h5>
            <textarea className="question-input" name="question" placeholder="질문을 작성해주세요." cols="30" rows="10"></textarea>
            <input className="question-input question-submit" type="submit" value="질문 전달하기"/>
        </QuestionForm>
    )
}
export default AskQuestion
