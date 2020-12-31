import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../modules/userInfoSetting';
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
`;

const Button = styled.button`
  margin-left: 20px;
  margin-top: 10px;
  width: 90px;
  height: 25px;
  display: flex;
  border: 1px solid #dee2e6;
  border-radius: 4px;

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
  margin-bottom: 3px;
`;

const UserImage2 = styled.img`
  width: 160px;
  height: 160px;
  padding-left: 20px;
`;

function UserInfoSetting() {
  const userInfo = useSelector(state => ({ ...state.userInfoSetting }));
  const dispatch = useDispatch();

  const [accoutInfo, setAccountInfo] = useState({
    email: '',
    username: '',
    mobile: '',
    gender: '1',
    image: '',
    selectedFile: '',
  });
  /* 이렇게 하면 요청 보내고 받은거로 상태 업데이트 -> 렌더 -> 또 요청 보내기 이렇게 됨
  if (!accoutInfo.mobile && !userInfo.mobile) {
    // 상태에 저장된 폰 번호가 없음, if문 안에 조건을 이 두개 다 안 넣으면 get을 ㅈㄴ보냄
    // 이렇게 해도 두번을 보내네..

    // 항상 모든 로그인의 처음에 get 으로 정보를 받아야함
    // 그니까 if문은 !accountInfo.mobile 만 남겨놓고 디스패치로 리덕스 스토어 업데이트 해야함
    console.log('asdfdsfa');
    axios
      .get(
        `https://localhost:4000/userInfoSetting/pageload?email=${userInfo.email}`
      )
      .then(res => {
        const data = res.data.data;
        
        dispatch(
          setUserInfo({
            email: data.email,
            username: data.username,
            mobile: data.mobile,
            gender: data.gender,
          })
        );
        
      });
  }
  */
  // useEffect로 렌더하면서 리덕스 스토어에서 가져온 userInfo를 현재 컴포넌트 로컬 상태에 저장

  useEffect(() => {
    setAccountInfo({ ...userInfo });
    return () => {
      console.log('UserInfoSetting Component Clean');
    };
  }, []);

  const inputFormHandler = e => {
    setAccountInfo({ ...accoutInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = () => {
    alert('설정 저장이 완료되었습니다.');
    axios
      .post('https://localhost:4000/userInfoSetting/setAccount', {
        ...accoutInfo,
      })
      .then(res => {
        console.log(res);
        dispatch(setUserInfo({ ...userInfo, ...accoutInfo }));
      });
  };

  const fileChangedHandler = event => {
    setAccountInfo({ ...accoutInfo, selectedFile: event.target.files[0] });
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
      <Input type='file' onChange={fileChangedHandler}></Input>
      <br></br>
      <SubmitButton
        onClick={e => {
          e.preventDefault();
          fileUploadHandler();
          onSubmitHandler();
        }}
      >
        설정 저장하기
      </SubmitButton>
    </InsertForm>
  );
}

export default UserInfoSetting;
