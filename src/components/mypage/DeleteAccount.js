import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SubmitButton } from './PasswordSetting';
import { setLogin } from '../../modules/login';
import Modal from '../ModalMessage';
import axios from 'axios';
axios.defaults.withCredentials = true;

const InsertForm = styled.form`
  border: 1px solid #dee2e6;
  width: 484px;
  height: 555px;
  margin-bottom: 100px;

  h1 {
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 10px;
    text-align: center;
    padding-bottom: 20px;
  }

  .content {
    padding-left: 23px;
    padding-right: 20px;
    margin-bottom: 30px;
    color: #8c8c8c;
    font-size: 15px;
    font-weight: lighter;
  }
`;

const BigInput = styled.textarea`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 86%;
  height: 140px;
  font-size: 12px;
  padding: 12px;
  margin-left: 20px;
  margin-bottom: 35px;
  resize: none; /* 크롬 크기조정 없애기 */
`;

const Select = styled.select`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 91.5%;
  color: gray;
  margin-left: 20px;
  margin-bottom: 15px;
  font-size: 12px;
  padding: 10px;

  option {
    color: black;
    min-height: 20px;
  }
  &:hover {
    cursor: pointer;
  }
`;

function DeleteAccount() {
  const email = useSelector(state => state.userInfoSetting.email);
  const [deleteAccountState, setDeleteAccountState] = useState({
    reason: '1',
    opinion: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setTimeout(() => {
      history.push('/');
    }, 500);
    setModalVisible(false);
    dispatch(setLogin(false));
  };

  const inputFormHandler = e => {
    setDeleteAccountState({
      ...deleteAccountState,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = () => {
    axios
      .post('https://localhost:4000/deleteAccount', {
        ...deleteAccountState,
        email,
      })
      .then(() => {
        setDeleteAccountState({
          reason: '1',
          opinion: '',
        });
      });
  };
  return (
    <InsertForm>
      <h1>회원 탈퇴</h1>
      <div className='content'>
        그동안 멘토투멘티와 함께해 주셔서 진심으로 감사드립니다. 탈퇴 사유를
        남겨 주시면 향후 서비스 개선에 적극적으로 반영하겠습니다.
      </div>
      <Select
        name='reason'
        value={deleteAccountState.reason}
        onChange={inputFormHandler}
      >
        <option value='1'>사유를 선택해주세요</option>
        <option value='2'>취업 후, 서비스를 이용할 일이 없어서</option>
        <option value='3'>서비스 이용이 불편해서</option>
        <option value='4'>답변을 받지 못해서</option>
        <option value='5'>기타 의견</option>
      </Select>
      <BigInput
        placeholder='기타 의견을 작성해주세요.'
        name='opinion'
        value={deleteAccountState.opinion}
        onChange={inputFormHandler}
      />
      <SubmitButton
        onClick={e => {
          e.preventDefault();
          onSubmitHandler();
          openModal();
        }}
      >
        회원 탈퇴
      </SubmitButton>
      {modalVisible ? (
        <Modal
          isDelete={true}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          그동안 저희 서비스를 이용해주셔서 감사드립니다.
        </Modal>
      ) : (
        ''
      )}
    </InsertForm>
  );
}

export default DeleteAccount;
