import React from 'react';

import styled from 'styled-components';
import { Text } from './text';

export interface InputInterface {
  id: string;
  placeholder?: string;
  inputMode?:
    | 'none'
    | 'text'
    | 'search'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | undefined;
  value?: string | number;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  background?: string;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface InputPropsInterface {
  background?: string;
  error?: string;
}
interface InputContainerInterface {
  error?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  box-sizing: border-box;
  align-items: flex-end;
  justify-content: center;
`;

const InputContainer = styled.div<InputContainerInterface>`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  border: 2px solid ${(props) => (props.error !== '' ? '#ff0000' : '#000')};
  border-radius: 3px;
  box-sizing: border-box;
`;

const InputLabel = styled.label`
  color: #000;
  position: absolute;
  top: 10px;
  left: 5px;
  background-color: #fff;
  transition: 300ms;
  transform: translate(-50%, -50%);
`;

const InputField = styled.input<InputPropsInterface>`
  outline: none;
  padding-left: 10px;
  padding-right: 15px;
  font-size: 18px;
  border: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.background !== undefined ? props.background : 'none')};

  &:valid + ${InputLabel} {
    top: 10px;
    left: 40px;
    padding: 0 3px;
    font-size: 14px;
    color: #8d8d8d;
  }
`;

export const Input = (props: InputInterface) => {
  return (
    <InputWrapper>
      <InputContainer error={props.error}>
        <InputField
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          inputMode={props.inputMode}
          onChange={props.onChange}
          value={props.value}
          background={props.error === '' ? props.background : 'rgba(230, 70, 70, 0.1)'}
          onKeyDown={props.onKeyDown}
        />
        {props.label ? <InputLabel htmlFor={props.id}>{props.label}</InputLabel> : null}
      </InputContainer>
      {props.error !== '' ? (
        <>
          <Text color={'#ff0000'} fontWeight={400} fontSize={10}>
            {props.error}
          </Text>
        </>
      ) : null}
    </InputWrapper>
  );
};
