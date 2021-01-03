import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import AskQuestion from './AskQuestion';
import { useSelector } from 'react-redux';

const MentorProfileTemplate = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding-top: 30px;
`;

const Profile = styled.div`
  ${props =>
    !props.isAskButtonOn &&
    css`
      margin-bottom: 10px;
    `}
  width: 1024px;
  h1 {
    margin-top: 10px;
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
    height: 30px;
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
  const [isAskButtonOn, setAskButtonOn] = useState(false);
  const mentorList = useSelector(state => {
    return state.mentorListReducer.mentorData;
  });
  const getMentor = () => {
    for (let mentor of mentorList) {
      if (mentor.mentorId === Number(match.params.mentorId)) {
        if (!mentor.image) {
          mentor.image =
            'https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png';
        }
        return mentor;
      }
    }
  };
  const mentor = getMentor();

  const handleAskButton = () => {
    setAskButtonOn(!isAskButtonOn);
  };

  return (
    <MentorProfileTemplate>
      <Profile isAskButtonOn={isAskButtonOn}>
        <h1>멘토 프로필</h1>
        <div className='profile-area'>
          <Card>
            <img className='mentor-img' src={mentor.image} alt='' />
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
              <button className='content mentor-btn' onClick={handleAskButton}>
                질문하기
              </button>
              <div className='content mentor-email'>
                {mentor.email || 'kimcode@nate.com'}
              </div>
            </div>
          </Card>

          <Introduction className='profile-content'>
            <div className='intro'>
              <h2>멘토 소개</h2>
              <div>{mentor.description || '아직 소개 내용이 없습니다'}</div>
            </div>
            <div className='career'>
              <h2>주요 경력</h2>
              <div>{mentor.career || `아직 소개 내용이 없습니다 `}</div>
            </div>
          </Introduction>
        </div>

        {isAskButtonOn ? <AskQuestion mentor={mentor} /> : ''}
      </Profile>
    </MentorProfileTemplate>
  );
}

export default MentorProfile;
