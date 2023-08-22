import styled from "styled-components";

const Wrapper = styled.section`
  .mr-miyagi {
    --uib-size: 35px;
    --uib-speed: 1s;
    --uib-color: var(--primary-500);
    --uib-line-weight: 3.5px;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--uib-size);
    width: var(--uib-size);
  }

  .mr-miyagi__line {
    position: absolute;
    top: calc(50% - var(--uib-line-weight) / 2);
    left: 0;
    height: var(--uib-line-weight);
    width: 100%;
    border-radius: calc(var(--uib-line-weight) / 2);
    background-color: var(--uib-color);
    animation: rotate var(--uib-speed) ease-in-out infinite alternate;
  }

  .mr-miyagi__line:nth-child(2) {
    animation-delay: calc(var(--uib-speed) * 0.075);
    opacity: 0.8;
  }

  .mr-miyagi__line:nth-child(3) {
    animation-delay: calc(var(--uib-speed) * 0.15);
    opacity: 0.6;
  }

  .mr-miyagi__line:nth-child(4) {
    animation-delay: calc(var(--uib-speed) * 0.225);
    opacity: 0.4;
  }

  .mr-miyagi__line:nth-child(5) {
    animation-delay: calc(var(--uib-speed) * 0.3);
    opacity: 0.2;
  }

  .mr-miyagi__line:nth-child(6) {
    animation-delay: calc(var(--uib-speed) * 0.375);
    opacity: 0.1;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(180deg);
    }
  }
`;

export default Wrapper;
