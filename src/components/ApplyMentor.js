import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './ModalMessage';
import { setUserInfo } from '../modules/userInfoSetting';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ApplyMentorTemplate = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding-top: 30px;
`;

const ApplyMentorDiv = styled.div`
  width: 960px;
  // border: 1px solid #dee2e6;
  // border-radius: 4px;
  // height: 750px;
  .mentor-img img {
    width: 500px;
    height: 380px;
  }
`;

const Title = styled.div`
  margin: 30px 30px;
  font-size: 24px;
  .title {
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 10px;
    font-family: 'Nanum Gothic', sans-serif;
    // font-family: 'Nanum Myeongjo', serif;
  }
  .content {
    font-family: 'Nanum Myeongjo', serif;
  }
`;

const Body = styled.div`
  margin: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: 0px 10px;
  }
`;

const Form = styled.form`
  width: 400px;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // border: 1px solid #dee2e6;
  // border-radius: 4px;
  .input-item {
    height: 50px;
    padding: 5px;
    padding-left: 10px;
    margin: 10px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
  }
  .input-select {
    height: 50px;
    padding-left: 10px;
    margin: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
  }
  .input-submit {
    border: rgb(37, 37, 37) 1px solid;
    background-color: rgb(37, 37, 37);
    cursor: pointer;
    height: 50px;
    color: white;
    &:hover {
      background-color: #b9a186;
      border: #b9a186 1px solid;
    }
  }
`;

function ApplyMentor() {
  const [mentorInfo, setMentorInfo] = useState({
    company: '',
    department: '',
    position: '',
    job: '1',
  });
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    already: false,
  });
  const openModal = already => {
    setModalVisible({ visible: true, already });
  };
  const closeModal = () => {
    setModalVisible({ visible: false, already: false });
  };
  //TODO Store에서 user 이메일을 가져온다
  const mentorEmail = useSelector(state => state.userInfoSetting.email);
  const isMentor = useSelector(state => state.userInfoSetting.isMentor);
  const inputFormHandler = e => {
    setMentorInfo({ ...mentorInfo, [e.target.name]: e.target.value });
  };
  // 멘토 지원하기 버튼 클릭 시 post 요청
  const mentorData = { ...mentorInfo, mentorEmail };
  const requestApplyMentor = event => {
    event.preventDefault();
    if (isMentor) {
      openModal(true);
      setMentorInfo({
        company: '',
        department: '',
        position: '',
        job: '1',
      });
    } else {
      axios.post('https://localhost:4000/applyMentor', mentorData).then(() => {
        openModal(false);
        setMentorInfo({
          company: '',
          department: '',
          position: '',
          job: '1',
        });
        dispatch(setUserInfo({ isMentor: true }));
      });
    }
  };
  return (
    <ApplyMentorTemplate>
      <ApplyMentorDiv>
        <Title>
          <div className='title'>멘토 지원하기</div>
          <div className='content'>Share your valuable career experience.</div>
        </Title>
        <Body>
          <div className='mentor-img'>
            <img
              src='https://d2ljmlcsal6xzo.cloudfront.net/assets/mentor_hero-fb0fabb03ac9a924cc639d018d7f1520d49c3f0f1bef7ef871a6c5141658a781.jpg'
              alt=''
            />
          </div>
          <Form onsubmit='return false'>
            <input
              name='company'
              value={mentorInfo.company}
              onChange={inputFormHandler}
              type='text'
              placeholder='회사명'
              className='input-item'
            />
            <input
              name='department'
              value={mentorInfo.department}
              onChange={inputFormHandler}
              type='text'
              placeholder='부서'
              className='input-item'
            />
            <input
              name='position'
              value={mentorInfo.position}
              onChange={inputFormHandler}
              type='text'
              placeholder='직급'
              className='input-item'
            />
            <select
              name='job'
              value={mentorInfo.job}
              onChange={inputFormHandler}
              className='input-select'
            >
              <option value='1'>직무를 선택해주세요</option>
              <option value='인사/총무/노무'>인사/총무/노무</option>
              <option value='마케팅/MD'>마케팅/MD</option>
              <option value='홍보/CSR'>홍보/CSR</option>
              <option value='영업/영업관리'>영업/영업관리</option>
              <option value='IT개발'>IT개발</option>
            </select>
            <input
              onClick={requestApplyMentor}
              type='submit'
              value='지원하기'
              className='input-item input-submit'
            />
            {modalVisible.visible ? (
              modalVisible.already ? (
                <Modal
                  visible={modalVisible}
                  closable={true}
                  maskClosable={true}
                  onClose={closeModal}
                  applymentor={true}
                >
                  이미 멘토에 지원하셨습니다.
                </Modal>
              ) : (
                <Modal
                  visible={modalVisible}
                  closable={true}
                  maskClosable={true}
                  onClose={closeModal}
                  applymentor={true}
                >
                  멘토 지원이 성공적으로 완료되었습니다.
                </Modal>
              )
            ) : (
              ''
            )}
          </Form>
        </Body>
      </ApplyMentorDiv>
    </ApplyMentorTemplate>
  );
}
export default ApplyMentor;
