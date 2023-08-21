import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center; // vertically center the .nav-center
  justify-content: center; // horizontally center the .nav-center
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1); // /* offset-x | offset-y | blur-radius | spread-radius | color */
  background: var(--background-secondary-color);

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .nav-text {
    display: none;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .nav-text {
      display: block;
    }
  }

  // to horizontally place the dark theme button and the logout button
  .btn-container {
    display: flex;
    align-items: center;
  }
`;
export default Wrapper;
