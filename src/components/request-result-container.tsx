import styled from 'styled-components';

interface RequestResultContainerInterface {
  width?: string;
  height?: string;
}

export const RequestResultContainer = styled.div<RequestResultContainerInterface>`
  width: ${(props) => (props.width !== undefined ? props.width : 'auto')};
  height: ${(props) => (props.height !== undefined ? props.height : 'auto')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
`;
