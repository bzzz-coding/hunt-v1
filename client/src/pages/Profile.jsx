import { FormRow, SubmitButton } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom"; // user from DashboardLayout context
import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get("avatar"); // formData method
  if (file && file.size > 500000) {
    toast.error("image size too large", {
      icon: "🤔",
      autoClose: 1000,
    });
    return null;
  }
  try {
    await customFetch.patch("users/update-user", formData);
    toast.success("profile updated", {
      icon: "🤩",
      autoClose: 1000,
    });
  } catch (error) {
    toast.error(error?.response?.data?.msg, {
      icon: "😑",
      autoClose: 1000,
    });
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      {/* Need to add encType="multipart/form-data because it includes a file so it won't be sent to the server as json" */}
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow type="text" name="lastName" defaultValue={lastName} />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
