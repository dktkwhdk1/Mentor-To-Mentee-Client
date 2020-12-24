import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Card.css'

function Card() {
    return (
        <div className="card-item">
            <div className="mentor-profile">
                <img className="mentor-img" src="https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg" />
                <div className="name">
                    <span className="mentor-name">조영권</span>
                    <span className="position">멘토</span>
                </div>
                <div className="job">
                    <div className="mentor-company">코드스테이츠</div>
                    <div>VVS 개발팀</div>
                </div>
                <div className="mentor-email">fuck@code.com</div>
                <button>질문하기</button>
            </div>



        </div>
    )
}

export default Card
