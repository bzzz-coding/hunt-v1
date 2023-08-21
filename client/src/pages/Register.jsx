import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import logo from "../assets/images/logo.png";
import { FormRow, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// Define and export action function for router (App.jsx):
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful", {
      icon: "🎉",
      autoClose: 1000,
    });
    // // always needs to return a value
    // return null;

    // only use redirect from rrd in actions
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg, {
      icon: "🧐",
      autoClose: 1000,
    });
    return error; // needs to return even if there is an error
  }
};

const Register = () => {
  return (
    <Wrapper>
      {/* Form default method is get */}
      <Form method="post" className="form">
        <img src={logo} alt="Hunt Logo" className="logo-img" />
        <h4>register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <SubmitButton />
        <p>
          Already a member? <br></br>
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
