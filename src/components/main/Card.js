import React from 'react';
import { StyledLink } from '../header/Header';
import styled from 'styled-components';

const CardItem = styled.div`
  margin: 15px;
  width: 310px;
  height: 357px;
  background-color: white;
  border-radius: 4px;
  font-size: 15px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px 0px;
  }

  .mentor-profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .mentor-img {
    margin-top: 30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .profile-main {
    margin-top: 30px;
  }

  .mentor-name {
    margin-right: 5px;
    font-weight: bold;
    font-size: 20px;
  }

  .job {
    margin-top: 10px;
    .content {
      margin-bottom: 5px;
    }
  }
`;

function Card({ mentorData }) {
  return (
    <StyledLink to={`/mentorprofile/${mentorData.mentorId}`}>
      <CardItem>
        <div className='mentor-profile'>
          <img
            className='mentor-img'
            src={
              mentorData.image ||
              'https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png'
            }
            alt=''
          />
          <div className='profile-main'>
            <div className='name'>
              <span className='mentor-name'>{mentorData.username}</span>
              <span className='mentor-text'>멘토</span>
            </div>
            <div className='job'>
              <div className='mentor-company content'>{mentorData.company}</div>
              <div className='mentor-department content'>
                {mentorData.department}
              </div>
              <div className='mentor-job content'>{mentorData.job}</div>
            </div>
            <div className='mentor-email'>
              {mentorData.email || 'dev@code.com'}
            </div>
          </div>
        </div>
      </CardItem>
    </StyledLink>
  );
}

export default Card;
