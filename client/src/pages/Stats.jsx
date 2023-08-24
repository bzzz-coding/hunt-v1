import { ChartsContainer, StatsContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return null; // not using data from loader

  // const response = await customFetch.get("/jobs/stats");
  // return response.data;
};

const Stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();

  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
