import { Form, redirect, Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import logo from "../assets/images/logo.png";
import { FormRow, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("login successful", {
      icon: "✨",
      autoClose: 1000,
    });
    return redirect("/dashboard");
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.msg, {
      icon: "🧐",
      autoClose: 1000,
    });
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const loginTestUser = async () => {
    try {
      const data = {
        email: "john.doe@example.com",
        password: "P@ssw0rd123",
      };
      await customFetch.post("/auth/login", data);
      toast.success("explore the app!", {
        icon: "👀",
        autoClose: 1000,
      });
      navigate("/dashboard");
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.msg, {
        icon: "🧐",
        autoClose: 1000,
      });
      return error;
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <img src={logo} alt="Hunt Logo" className="logo-img" />
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitButton />
        <button type="button" className="btn btn-block" onClick={loginTestUser}>
          explore the app
        </button>
        <p>
          Not a member yet? <br></br>
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
