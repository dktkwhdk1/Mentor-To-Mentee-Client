import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"

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

function UserModal() {
    return (
        <Modal>
            <Link to='/mypage'>
                <div className="modal-item">마이페이지</div>
            </Link>
            <div className="modal-item">로그아웃</div>
        </Modal>
    )
}

export default UserModal
