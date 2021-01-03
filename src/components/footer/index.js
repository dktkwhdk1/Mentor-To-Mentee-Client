import React from 'react';
import styled from 'styled-components';
import {GoMarkGithub} from 'react-icons/go'

//styled component
const FooterDiv = styled.footer`
  margin-top: 30px;
  background-color: rgb(235, 235, 235);
  height: 150px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin: 10px;
  }

  .icon {
    color: black;
    font-size: 50px;
    padding: 0px;
  }
`;

function Footer() {
  return (
    <FooterDiv>
      <h1>
        <a href="https://github.com/codestates/Mentor-To-Mentee-client/wiki">
          <GoMarkGithub className='icon'/>
        </a>
      </h1>
      <div>2021 © Design & Code by VVS</div>
    </FooterDiv>
  );
}

export default Footer;
