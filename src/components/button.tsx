import React from 'react';

import styled from 'styled-components';
import { LoadingDot } from './loading';

interface ButtonInterface {
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
  title: string;
  loading: boolean;
}

interface StyledButtonProps {
  isLoading: boolean;
}
const StyledButton = styled.button<StyledButtonProps>`
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
    background-color: ${(props) => (props.isLoading ? '#DC2A00' : '#fff')};
    color: #000;
  }
`;

export const Button = (props: ButtonInterface) => {
  return (
    <StyledButton disabled={props.disabled} type={props.type} isLoading={props.loading}>
      {!props.loading ? (
        props.title
      ) : (
        <>
          <LoadingDot delay={'0.1s'} />
          <LoadingDot delay={'0.2s'} />
          <LoadingDot delay={'0.3s'} />
        </>
      )}
    </StyledButton>
  );
};
