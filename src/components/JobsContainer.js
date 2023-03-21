import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useEffect } from "react";
import Loading from "./Loading";
import { getAllJobs } from "../features/job/allJobsSlice";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { jobs, isLoading, page, sort, search, searchStatus, searchType, totalJobs, numOfPages } = useSelector((state) => state.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return (
      <Wrapper>
       <Loading center />
      </Wrapper>
    );
  }
  if (jobs?.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs found...</h2>
      </Wrapper>
    );
  }
  
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 &&  <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
