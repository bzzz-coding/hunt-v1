import { FormRow, FormRowSelect, SubmitButton } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPES } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const currentJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      console.log(data);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    // console.log(params);
    try {
      // const { data } = await customFetch.get(`/jobs/${params.id}`);
      // console.log(data);
      const { id } = params;
      await queryClient.ensureQueryData(currentJobQuery(id));
      return id;
    } catch (error) {
      toast.error(error?.response?.data?.msg, {
        icon: "🫥",
        autoClose: 1000,
      });
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["job"]);
      toast.success("job updated", {
        icon: "💪",
        autoClose: 1000,
      });
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg, {
        icon: "😮‍💨",
        autoClose: 3000,
      });
      return error;
    }
  };

const EditJob = () => {
  // const { job } = useLoaderData();
  // console.log(job);
  // const { company, position, jobLocation, jobStatus, jobType } = job;
  const id = useLoaderData();

  // console.log(useQuery(currentJobQuery(id)));
  const {
    data: { job },
  } = useQuery(currentJobQuery(id));
  console.log(job);
  const { company, position, jobLocation, jobStatus, jobType } = job;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="company" defaultValue={company} />
          <FormRow type="text" name="position" defaultValue={position} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={jobType}
            list={Object.values(JOB_TYPES)}
          />
        </div>
        <SubmitButton formBtn />
      </Form>
    </Wrapper>
  );
};

export default EditJob;
