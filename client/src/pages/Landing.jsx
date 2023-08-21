import main from "../assets/images/main.svg";
import { Logo } from "../components";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Hunt</span> Tracking
          </h1>
          <p>
            It's a marathon, not a sprint. This app helps track all your job
            hunt efforts--from hitlist to networking, and from applications and
            interviews to offers!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="Job Hunt Image" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
