import logo from "../assets/images/logo.png";
import logoText from "../assets/images/logoH.svg";
import Wrapper from "../assets/wrappers/Logo";

const Logo = () => {
  return (
    <Wrapper>
      <div className="logo">
        <img src={logo} alt="Hunt logo" className="logo-img" />
        <img src={logoText} alt="Hunt logo text" className="logo-txt" />
      </div>
    </Wrapper>
  );
};
export default Logo;
