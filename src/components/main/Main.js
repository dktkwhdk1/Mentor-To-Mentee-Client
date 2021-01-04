import React, { useEffect, useState } from 'react';
import Card from './Card';
import styled from 'styled-components';
import { setMentorListAction } from '../../modules/main';
import { useDispatch } from 'react-redux';
import VVS from '../../VVS.gif';
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
    margin-top: 30px;
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
    font-family: 'Nanum Myeongjo', serif;
    animation-name: fadeIn;
    animation-duration: 5s;
    animation-iteration-count: infinite;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
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
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {window.location.pathname === '/' ? (
        <MainImage>
          <img
            // src='https://html.nkdev.info/skylith/assets/images/header-blog.jpg'
            src={VVS}
            alt=''
          />
          <div className='background' />
          <div className='vvs'>We create products that make people happy</div>
          <br />
          <br />
          <div className='vvs'>We create products that make people happy</div>
        </MainImage>
      ) : (
        ''
      )}
      <MainDiv>
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
