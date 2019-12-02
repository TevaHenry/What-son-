import styled,  { keyframes } from 'styled-components';

const striker = keyframes`
  from {
    stroke-dashoffset: -550;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

export const MainPageContainer = styled.div`
  height: 100vh;
  background: #1CB5E0;
  background: -webkit-linear-gradient(to bottom, #1CB5E0, #000046);
  background: linear-gradient(to bottom, #1CB5E0, #000046);
  color: white;

  .particles {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const MicContainer = styled.div`
  border: white 4px solid;
  border-radius: 50%;
  height: 30vh;
  width: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  fill: white;

  #strike {
    stroke-dasharray: 550;
    stroke-dashoffset: -550;
    animation: ${striker} 0.2s ease-in forwards;
  }
`;