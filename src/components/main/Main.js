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
  max-width: 1024px;
  position: relative;

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
    margin-top: 40px;
    text-align: center;
  }
`;

const MainImage = styled.div`
  position: relative;
  height: 400px;

  img {
    position: absolute;
    height: 400px;
    width: 100%;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
  }
  .vvs {
    width: 100%;
    height: 100%;
    position: absolute;
    color: white;
    font-size: 30px;
    text-align: center;
    line-height: 400px;
  }
  .VideoWorker-0 {
    position: absolute;
    width: 100%;
    height: 400px;
    border: 0;
    inset: 0px;
  }
`;

const MainVideo = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: center;
  z-index: 0;

  .VideoWorker-0 {
    position: absolute;
    width: 100%;
    height: 400px;
    border: 0;
    inset: 0px;
    max-width: none;
    max-height: none;
    pointer-events: none;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
`;

const MainVideo2 = styled.div`
  .bg-video-overlay {
    background-color: rgba(0, 0, 0, 0.6);
  }
  .jarallax-container-0 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -100;
  }
  .bg-container {
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('https://i.vimeocdn.com/video/641015266_640.jpg');
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1360px;
    height: 678px;
    overflow: hidden;
    pointer-events: none;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform, opacity;
    margin-top: 16px;
    transform: translate3d(0px, -16px, 0px);
    display: none;
  }
  .VideoWorker-0 {
    position: absolute;
    inset: 0px;
    width: 1205.33px;
    height: 1078px;
    max-width: none;
    max-height: none;
    pointer-events: none;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform, opacity;
    margin: -184px 0px 0px -234.167px;
    z-index: -1;
    transform: translate3d(0px, -35.6px, 0px);
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
    return;
  }, []);

  //Todo 모달 영역 밖 클릭시 모달 닫히는 기능 구현 https://velog.io/@seungdeng17/%EB%AA%A8%EB%8B%AC-%EC%98%81%EC%97%AD-%EB%B0%96-%ED%81%B4%EB%A6%AD%EC%8B%9C-%EC%89%BD%EA%B2%8C-%EB%8B%AB%EA%B8%B0

  return (
    <>
      {window.location.pathname === '/' ? (
        <MainImage>
          <img src='https://html.nkdev.info/skylith/assets/images/header-blog.jpg' />
          <div className='background' />
          <div className='vvs'>Very Very Sexy Brain Guys</div>
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
