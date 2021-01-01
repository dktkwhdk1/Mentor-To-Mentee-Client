import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import AskQuestion from './AskQuestion';
import { useSelector } from 'react-redux';

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

  .profile-content {
    padding: 20px;
  }

  .mentor-img {
    margin: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

const Card = styled.div`
  background-color: beige;
  width: 200px;
  margin-right: 30px;
`;

const Introduction = styled.div`
  background-color: lightblue;
  width: 600px;

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
        <Card className='profile-content'>
          <img
            className='mentor-img'
            src='https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'
            alt=''
          />
          <div className='name'>
            <span className='mentor-name'>{mentor.username}</span>
            <span className='mentor-text'>멘토</span>
          </div>
          <div className='job'>
            <div className='mentor-company'>{mentor.company}</div>
            <div>{mentor.department}</div>
          </div>
          <div className='profile-badges'>
            <div className='response-rate'>답변율</div>
            <div className='response-count'>답변수</div>
          </div>
          <div className='mentor-email'>{mentor.email}</div>
          <button onClick={handleAskButton}>질문하기</button>
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
