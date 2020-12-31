import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken } from '../../modules/login'

const Modal = styled.div`
position: absolute;
border: 1px solid;

right: 0%;
top: 12.5%;

.modal-item {
border: 0.5px solid;
padding: 15px 40px 15px 8px;
background-color: #f8f9fa;
text-align: left;
cursor: pointer;
}
`

function UserModal({ setLogin, setUserModalButtonOn }) {
    let accessToken = useSelector(state => state.login.token)
    const userEmail = useSelector(state => state.userInfoSetting.email)
    const dispatch = useDispatch();

    const logoutHandler = async () => {

        // accessToken을 헤더에 담아서 accessTokenHandler 보내고, userInfo를 받아온다
        let res = await axios.get('https://localhost:4000/accessTokenHandler', {
            headers: {
                authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        let userInfo = res.data.data
        console.log(userInfo)

        //userinfo가 없으면 리프레시 토큰 요청
        if (!userInfo) {
            let res = axios.get('https://localhost:4000/refreshTokenHandler', { withCredentials: true })
            userInfo = res.data.data
        }

        // 정상적으로 인증되었을경우 로그아웃 요청
        if (userInfo.email === userEmail) {
            axios.get('https://localhost:4000/signOut', { withCredentials: true })
                .then((res) => {
                    dispatch(setAccessToken(res.data.accessToken))  // -> accessToken = null
                    setLogin(false)
                    setUserModalButtonOn(false)
                })
        }
    }

    return (
        <Modal>
            <Link to='/mypage'>
                <div className="modal-item">마이페이지</div>
            </Link>
            <div onClick={logoutHandler} className="modal-item">로그아웃</div>
        </Modal>
    )
}

export default UserModal
