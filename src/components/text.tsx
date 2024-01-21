import styled from 'styled-components';

interface TextPropsInterface {
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: number;
  align?: string;
  width?: string;
}

export const Text = styled.p<TextPropsInterface>`
  color: ${(props) => (props.color !== undefined ? props.color : '#000')};
  font-size: ${(props) => (props.fontSize !== undefined ? String(props.fontSize) + 'px' : '16px')};
  line-height: ${(props) =>
    props.lineHeight !== undefined ? String(props.lineHeight) + 'px' : '20px'};
  font-weight: ${(props) => (props.fontWeight !== undefined ? props.fontWeight : 'normal')};
  align-content: ${(props) => (props.align !== undefined ? props.align : '')};
  width: ${(props) => (props.width !== undefined ? props.width : 'auto')};
`;
