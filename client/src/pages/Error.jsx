import { useRouteError, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Not Found Img" />
          <h3>Oops! Page not found.</h3>
          <p>We can't seem to find the page you are looking for.</p>
          <Link to="/dashboard">Return to Home Page</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <div>
      <h1>Something went wrong...</h1>
      <Link to="/">Return to Home Page</Link>
    </div>
  );
};
export default Error;
