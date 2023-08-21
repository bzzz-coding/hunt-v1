import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  // // creates a new URL object by passing the request.url to the URL constructor. The URL object provides various methods and properties to work with URLs.
  // console.log(request.url);

  /* 
.searchParams: The searchParams property of the URL object gives you access to the query parameters in the URL. It is an instance of the URLSearchParams class, which provides methods to manipulate and access the parameters.

.entries(): The entries() method of searchParams returns an iterator containing arrays of key-value pairs for each query parameter. Each array contains two elements: the parameter name and its corresponding value.

([...new URL(request.url).searchParams.entries()]): The spread operator ... is used to convert the iterator obtained from searchParams.entries() into an array. 

Object.fromEntries(): This static method creates an object from an array of key-value pairs. 
*/
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  // console.log(params);

  try {
    const { data } = await customFetch.get("/jobs", { params });
    // console.log(data);
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg, {
      icon: "😔",
      autoClose: 1000,
    });
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
