import { FormRow, FormRowSelect, SubmitButton } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPES } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = (queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    queryClient.invalidateQueries(["jobs"]);
    toast.success("successfully added job", {
      icon: "🚀",
      autoClose: 1000,
    });
    return redirect("all-jobs");
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.msg, {
      icon: "😮‍💨",
      autoClose: 1000,
    });
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={JOB_STATUS}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={JOB_TYPES}
            defaultValue={JOB_TYPES.FULL_TIME}
          />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
