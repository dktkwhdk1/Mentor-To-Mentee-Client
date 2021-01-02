import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import AskQuestion from './AskQuestion';
import { useSelector } from 'react-redux';
import CardItem from '../main/Card'
import { GoCode } from 'react-icons/go';

const Profile = styled.div`
  ${props =>
    !props.isAskButtonOn &&
    css`
      margin-bottom: 200px;
    `}

  h1 {
    margin-top: 50px;
    margin-left: 50px;
  }

  .profile-area {
    display: flex;
    margin: 50px;
  }

  `;
  
  const Card = styled.div`
  padding: 20px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #dee2e6;
  width: 250px;
  height: 300px;
  margin-right: 30px;

  .profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mentor-name {
    margin-right: 5px;
    font-weight: bold;
    font-size: 15px;
  }

  .mentor-img {
    margin: 10px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .mentor-btn {
    background-color: black;
    border: black 1px solid;
    color: white;
    height:30px;
    width: 90px; 
    cursor: pointer;
    
    &:hover {
      background-color: #b9a186;
      color: white;
      border: #b9a186 1px solid;
  }
  }

  .content {
    margin-top: 12px;
  }
`;

const Introduction = styled.div`
  border: 1px solid #dee2e6;
  padding: 35px;
  width: 800px;
  .intro h2 {
    margin-top: 10px;
  }
`;

function MentorProfile({ match }) {
  console.log(match.params.username);
  const [isAskButtonOn, setAskButtonOn] = useState(false);

  //TODO mentorList에서 params로 가져온 username과 일치하는 데이터 뽑아내서 변수로저장.
  const mentorList = useSelector(state => {
    console.log(state);
    return state.mentorListReducer.mentorData;
  });

  const getMentor = () => {
    for (let mentor of mentorList) {
      if (mentor.username === match.params.username) {
        return mentor;
      }
    }
  };
  const mentor = getMentor();

  const handleAskButton = () => {
    setAskButtonOn(!isAskButtonOn);
  };

  return (
    <Profile isAskButtonOn={isAskButtonOn}>
      <h1>멘토 프로필</h1>
      <div className='profile-area'>
        <Card>
          <img
            className='mentor-img'
            src='https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
            alt=''
          />
          <div className='profile-content'>
            <div className='name content'>
              <span className='mentor-name'>{mentor.username}</span>
              <span className='mentor-text'>멘토</span>
            </div>
            <div className='content job'>
              <div className='mentor-company'>{mentor.company}</div>
              <div>{mentor.department}</div>
              <div>{mentor.job || '과장'}</div>
            </div>
            <button className="content mentor-btn" onClick={handleAskButton}>질문하기</button>
            <div className='content mentor-email'>{mentor.email || 'kimcode@nate.com'}</div>

          </div>
        </Card>

        <Introduction className='profile-content'>
          <div className='intro'>
            <h2>멘토 소개</h2>
            <div>
              {mentor.description ||
                '백화점과 디스플레이 회사를 거쳐, 지금은 자동차 회사에 다니고 있습니다. 성격이 전혀 다른 3가지 직무와 회사를 경험한 사람으로서, 제 경험과 노하우가 첫 취업을 준비하시는 분들뿐만 아니라 새로운 도전을 꿈꾸시는 중고신입분들께도 도움이 되었으면 좋겠습니다.'}
            </div>
          </div>
          <div className='career'>
            <h2>주요 경력</h2>
            <div>
              {mentor.career ||
                `현) 현대자동차 글로벌상품지원1팀 매니저<br />
                        전) LG디스플레이 커머셜마케팅팀 선임<br />
                        전) 롯데백화점 수원점 파트리더(영업관리자)`}
            </div>
          </div>
        </Introduction>
      </div>

      {isAskButtonOn ? <AskQuestion mentor={mentor} /> : ''}
    </Profile>
  );
}

export default MentorProfile;
