import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import StatsItem from "../components/StatsItem";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("you are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { userCount, jobCount } = useLoaderData();
  return (
    <Wrapper>
      <StatsItem
        title="users"
        count={userCount}
        color="#e0b040"
        bg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatsItem
        title="jobs"
        count={jobCount}
        color="#647acb"
        bg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;
