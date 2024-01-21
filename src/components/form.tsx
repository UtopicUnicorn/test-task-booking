import styled from 'styled-components';

interface FormInterface {
  width?: string;
  height?: string;
}

export const Form = styled.form<FormInterface>`
  width: ${(props) => (props.width !== undefined ? props.width : 'auto')};
  height: ${(props) => (props.height !== undefined ? props.height : 'auto')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
`;
