import styled from "styled-components";

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    // Set nav display to 'flex' and set align-items to 'center' so the logo is vertically centered in the nav
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    // After centered the content, use negative margin to lift it up a little
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    // Nesting is allowed in styled components, just like Sass
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }

  .register-link {
    margin-right: 1rem;
  }

  .main-img {
    // On small screen, do not display the image
    display: none;
  }

  // Overrides global styles
  .btn {
    padding: 0.75rem 1rem;
  }

  // Medium-sized screen
  @media (min-width: 992px) {
    // .page already has a display of 'grid'
    .page {
      grid-template-columns: 1fr 400px; // 2 columns, fixed width for the second one (main image)
      column-gap: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
