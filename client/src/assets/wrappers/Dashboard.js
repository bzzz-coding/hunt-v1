import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  @media (min-width: 992px) {
    // BigSidebar will take the first column, with a width of it's width
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%; // 90% of the second column
    }
  }
`;
export default Wrapper;
