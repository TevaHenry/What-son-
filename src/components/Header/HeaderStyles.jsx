import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg)
  }
`;

const expand = keyframes`
  from {
    transform: translateX(15vw);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const HeaderContainer = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const InfoContainer = styled.div`
  width: 50%;
  height: 90%;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  z-index: 2;

  .info{
    width: 50px;
    fill: white;
  }

  &:hover {
    &::before {
      content: "Choose your input and ouput languages then toggle the microphone to start/stop real time translation.";
      width: 65vmin;
      display: block;
      position: relative;
      margin: auto;
      font-size: 2.5vmin;

      animation: ${expand} 0.4s ease-out forwards
    }

    .info {
      animation: ${rotate} 0.3s ease-in-out forwards;
    }
  }
`;