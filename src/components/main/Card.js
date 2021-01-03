import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//styled Component
const CardItem = styled.div`
  margin: 15px;
  width: 310px;
  height: 357px;
  background-color: white;
  border-radius: 4px;
  font-size: 12px;

  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px 0px;
  }

  .mentor-profile {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
  }

  .mentor-img {
    margin: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .mentor-name {
    margin-right: 5px;
    font-weight: bold;
    font-size: 15px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function Card({ mentorData }) {
  return (
    <StyledLink to={`/mentorprofile/${mentorData.username}`}>
      <CardItem>
        <div className='mentor-profile'>
          <img
            className='mentor-img'
            src={
              mentorData.image ||
              'https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png'
            }
          />
          <div className='name'>
            <span className='mentor-name'>{mentorData.username}</span>
            <span className='mentor-text'>멘토</span>
          </div>
          <div className='job'>
            <div className='mentor-company'>{mentorData.company}</div>
            <div>{mentorData.department}</div>
          </div>
          <div className='mentor-email'>
            {mentorData.email || 'dev@code.com'}
          </div>
        </div>
      </CardItem>
    </StyledLink>
  );
}

export default Card;
