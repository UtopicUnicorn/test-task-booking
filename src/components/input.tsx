import React from 'react';

import styled from 'styled-components';

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
}

interface InputPropsInterface {
  background?: string;
}

const InputContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 55px;
  border: 2px solid #000;
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
    <InputContainer>
      <InputField
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        inputMode={props.inputMode}
        onChange={props.onChange}
        value={props.value}
        background={props.background}
      />
      {props.label ? <InputLabel htmlFor={props.id}>{props.label}</InputLabel> : null}
    </InputContainer>
  );
};
