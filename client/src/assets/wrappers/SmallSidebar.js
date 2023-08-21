import styled from "styled-components";

const Wrapper = styled.aside`
  // use <aside> element

  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed; // fixed position, takes up the entire screen
    inset: 0; // is a shorthand that corresponds to the top, right, bottom, and/or left properties.
    background: rgba(41, 50, 60, 0.75);
    background: var(--primary-900);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1; // behind the main content of the page
    opacity: 0;
    transition: var(--transition);
    /* The visibility CSS property shows or hides an element without changing the layout of a document. */
    visibility: hidden;
  }

  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }

  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative; // because the close-btn is absolutely positioned
    display: flex;
    align-items: center;
    flex-direction: column; // vertically stack Logo and .nav-links
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }

  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column; // vertically stack all .nav-link's
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }

  .nav-link:hover {
    color: var(--primary-500);
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    // Set display to grid and center the svg in the span
    display: grid;
    place-items: center;
  }

  .active {
    color: var(--primary-500);
  }
`;

export default Wrapper;
