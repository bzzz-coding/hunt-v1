import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  // console.log(params);
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("job deleted", {
      icon: "🫧",
      autoClose: 1000,
    });
  } catch (error) {
    toast.error(error?.response?.data?.msg, {
      icon: "🫠",
      autoClose: 1000,
    });
  }
  return redirect("../all-jobs"); // or "/dashboard/all-jobs"
};
