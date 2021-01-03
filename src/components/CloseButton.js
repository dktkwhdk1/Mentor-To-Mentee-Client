import React from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const Close = styled.div`
  width: 25px;
  height: 20px;
  float: right;
  cursor: pointer;
`;

function CloseButton({ close }) {
  return (
    <Close onClick={close}>
      <MdClose></MdClose>
    </Close>
  );
}

export default CloseButton;
