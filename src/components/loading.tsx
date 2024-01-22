import styled, { keyframes } from 'styled-components';

interface LoadingDotInterface {
  delay: string;
}

const loadingDotAnimation = keyframes`
  0% {
    margin-bottom: 0;
  }

  50% {
    margin-bottom: 1rem;
  }

  100% {
    margin-bottom: 0;
  }
`;

export const LoadingDot = styled.div<LoadingDotInterface>`
  background-color: black;
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  animation: ${loadingDotAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;
