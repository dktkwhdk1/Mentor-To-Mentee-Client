import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

const Close = styled.div`
  width: 25px;
  height: 20px;
  float: right;
  cursor: pointer;
`;

function CloseButton() {
  return (
    <Close>
      <AiOutlineClose></AiOutlineClose>
    </Close>
  );
}

export default CloseButton;
