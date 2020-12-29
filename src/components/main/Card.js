import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';


//styled Component
const CardItem = styled.div`
margin: 15px;
width: 300px;
height: 180px;
background-color: lightblue;
border-radius: 15px;
font-size: 12px;

.mentor-profile {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
}

.mentor-img {
    margin: 10px;
    width:60px;
    height:60px;
    border-radius: 50%;
}

.mentor-name {
    margin-right: 5px;
    font-weight: bold;
    font-size: 15px;
}
`

function Card({mentorData}) {
    return (
        <Link to="/mentorprofile" style={{color: 'inherit', textDecoration: 'inherit'}}>
            <CardItem>
                <div className="mentor-profile">
                    <img className="mentor-img" src={mentorData.user.images} />
                    <div className="name">
                        <span className="mentor-name">{mentorData.user.username}</span>
                        <span className="mentor-text">멘토</span>
                    </div>
                    <div className="job">
                        <div className="mentor-company">{mentorData.company}</div>
                        <div>{mentorData.department}</div>
                    </div>
                    <div className="mentor-email">{mentorData.user.email}</div>
                </div>
            </CardItem>
        </Link>
    )
}

export default Card
