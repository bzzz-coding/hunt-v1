import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  // console.log(data);

  const { jobs, totalJobs, totalPages, currentPage } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No job to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{totalJobs > 0 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {totalPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
