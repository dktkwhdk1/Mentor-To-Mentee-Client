import React, { useEffect, useState } from 'react';
import Card from './Card';
import styled from 'styled-components';
import { setMentorListAction } from '../../modules/main';
import { useDispatch } from 'react-redux';
import axios from 'axios';
axios.defaults.withCredentials = true;

const MainDiv = styled.main`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  max-width: 1024px;

  .cards-container {
    display: flex;
    justify-content: space-around;
    align-content: flex-end;
    flex-wrap: wrap;
  }

  .card {
    margin: 30px;
  }

  h1 {
    text-align: center;
  }
`;

const MainImage = styled.div`
height: 370px;
img {
    height: 370px;
    width: 100%;
  }
`;

function Main() {
  const [mentorList, setMentorList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestMentorList = () => {
      axios.get('https://localhost:4000/main').then(res => {
        setMentorList(res.data.data); // hook으로 mentorList 저장
        dispatch(setMentorListAction(res.data.data)); // 스토어에 저장
      });
    };

    requestMentorList();
    return () => {
      console.log('MainComponent clean');
    };
  }, []);

  //Todo 모달 영역 밖 클릭시 모달 닫히는 기능 구현 https://velog.io/@seungdeng17/%EB%AA%A8%EB%8B%AC-%EC%98%81%EC%97%AD-%EB%B0%96-%ED%81%B4%EB%A6%AD%EC%8B%9C-%EC%89%BD%EA%B2%8C-%EB%8B%AB%EA%B8%B0

  return (
    <>
      {window.location.pathname === '/' ? (
        <MainImage>
          <img src='https://html.nkdev.info/skylith/assets/images/header-blog.jpg' />
        </MainImage>
      ) : (
          ''
        )}
      <MainDiv>
        <h1>MENTOR LIST</h1>
        <div className='cards-container'>
          {mentorList.map(mentorData => {
            return (
              <Card
                key={mentorData.email}
                className='card'
                mentorData={mentorData}
              />
            );
          })}
        </div>
      </MainDiv>
    </>
  );
}

export default Main;
