import { FormRow, FormRowSelect, SubmitButton } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPES, JOB_STATUS, JOBS_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  // console.log(searchValues);
  const { search, jobType, jobStatus, sort } = searchValues;

  const submit = useSubmit();

  const debounce = (fn) => {
    let timeout;
    return (e) => {
      // The global clearTimeout() method cancels a timeout previously established by calling setTimeout().
      clearTimeout(timeout);
      const form = e.currentTarget.form;
      timeout = setTimeout(() => {
        fn(form);
      }, 1500);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          ></FormRow>
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPES)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOBS_SORT_BY)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            reset search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
