import React from 'react';

import styled from 'styled-components';

interface ButtonInterface {
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
  title: string;
}

const StyledButton = styled.button`
  border-radius: 4px;
  overflow: hidden;
  background-color: #ff4114;
  padding: 18px 40px 18px 40px;
  width: 90%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  size: 16px;
  line-height: 20px;
  font-weight: 400;
  &:hover {
    background-color: #f72f00;
  }
  &:disabled {
    background-color: white;
    color: #000;
  }
`;

export const Button = (props: ButtonInterface) => {
  return (
    <StyledButton disabled={props.disabled} type={props.type}>
      {props.title}
    </StyledButton>
  );
};
