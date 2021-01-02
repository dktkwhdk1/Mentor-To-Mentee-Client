import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../modules/userInfoSetting';
import Modal from '../ModalMessage';
import axios from 'axios';
axios.defaults.withCredentials = true;

const InsertForm = styled.form`
  background: #f8f9fa;
  width: 484px;
  height: 760px;

  div {
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 20px;
  }

  h1 {
    padding-left: 20px;
    padding-bottom: 20px;
    padding-right: 10px;
    text-align: center;
  }
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 87%;
  font-size: 14px;
  padding: 10px;
  margin-left: 20px;
  margin-bottom: 15px;

  .image {
    width: 40%;
  }
`;

const FileInput = styled.label`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  font-size: 14px;
  margin-left: 20px;
  margin-bottom: 10px;
  padding: 6px 25px;
  background-color: #a4a4a4;
  border-radius: 4px;
  color: white;
  cursor: pointer;
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

const SubmitButton = styled.button`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 91.5%;
  font-size: 12px;
  padding: 10px;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  background: #38d9a9;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const UserImage1 = styled.div`
  border: 1px solid #dee2e6;
  width: 160px;
  height: 160px;
  margin-left: 20px;
`;

const UserImage2 = styled.img`
  width: 160px;
  height: 160px;
  padding-left: 20px;
  margin-bottom: 10px;
`;

function UserInfoSetting() {
  const userInfo = useSelector(state => ({ ...state.userInfoSetting }));
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const [accoutInfo, setAccountInfo] = useState({
    email: '',
    username: '',
    mobile: '',
    gender: '1',
    image: '',
    selectedFile: '',
  });

  useEffect(() => {
    if (!userInfo.mobile) {
      axios
        .get(
          `https://localhost:4000/userInfoSetting/pageload?email=${userInfo.email}`
        )
        .then(res => {
          const data = res.data.data;
          dispatch(
            setUserInfo({
              ...userInfo,
              email: data.email,
              username: data.username,
              mobile: data.mobile,
              gender: data.gender,
              image: data.image,
              selectedFile: data.selectedFile,
            })
          );
        });
    }
    setAccountInfo({ ...userInfo });
    return;
  }, []);

  const inputFormHandler = e => {
    setAccountInfo({ ...accoutInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = () => {
    // alert('설정 저장이 완료되었습니다.');
    axios
      .post('https://localhost:4000/userInfoSetting/setAccount', {
        ...accoutInfo,
      })
      .then(() => {
        dispatch(setUserInfo({ ...userInfo, ...accoutInfo }));
      });
  };

  const fileUploadHandler = () => {
    const data = new FormData();
    if (accoutInfo.selectedFile) {
      data.append(
        'profileImage',
        accoutInfo.selectedFile,
        accoutInfo.selectedFile.name
      );
      axios
        .post('https://localhost:4000/imageUpload', data, {
          headers: {
            accept: 'application/json',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then(res => {
          setAccountInfo({ ...accoutInfo, image: res.data.location });
        });
    }
  };

  const fileChangedHandler = e => {
    setAccountInfo({
      ...accoutInfo,
      image: '',
      selectedFile: e.target.files[0],
    });
  };
  if (accoutInfo.selectedFile && !accoutInfo.image) {
    fileUploadHandler();
  }

  return (
    <InsertForm>
      <h1>계정 설정</h1>
      <div>이메일 *</div>
      <Input value={accoutInfo.email} readOnly />
      <div>이름 *</div>
      <Input value={accoutInfo.username} readOnly />
      <div>휴대전화 번호</div>
      <Input
        type='text'
        placeholder='번호를 입력해주세요.(숫자만)'
        name='mobile'
        value={accoutInfo.mobile}
        onChange={inputFormHandler}
      ></Input>
      <div>성별</div>
      <Select
        name='gender'
        value={accoutInfo.gender}
        onChange={inputFormHandler}
      >
        <option value='1'>성별을 선택해주세요</option>
        <option value='2'>남자</option>
        <option value='3'>여자</option>
      </Select>
      <div>프로필 사진</div>
      {accoutInfo.image ? (
        <UserImage2 src={accoutInfo.image} alt='' />
      ) : (
        <UserImage1>이미지를 넣어주세요</UserImage1>
      )}
      <br />
      <FileInput htmlFor='input-file'>
        {accoutInfo.image ? '이미지 수정하기' : '이미지 업로드'}
        <input
          id='input-file'
          type='file'
          onChange={fileChangedHandler}
          style={{ display: 'none' }}
        />
      </FileInput>
      <SubmitButton
        onClick={e => {
          e.preventDefault();
          onSubmitHandler();
          openModal();
        }}
      >
        설정 저장하기
      </SubmitButton>
      {modalVisible ? (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          설정 저장이 완료되었습니다.
        </Modal>
      ) : (
        ''
      )}
    </InsertForm>
  );
}

export default UserInfoSetting;
