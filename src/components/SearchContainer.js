import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { FormRow, Select } from "./";
import { useState, useMemo } from "react";
import { clearFilters, handleChange } from "../features/job/allJobsSlice";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((state) => state.allJobs);
  const { statusOptions, jobTypeOptions } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    // stop from refetching
    if (isLoading) return
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters())
  };

  const debounce = () => {
    let timeoutID
    return (e) => {
       setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
      },1000)
    }
  }

  // const debounce = (func, delay) => {
  //   let timeoutID
  //   return (...args) => {
  //     clearTimeout(timeoutID)
  //     timeoutID = setTimeout(() => {
  //       func(...args)
  //     }, delay)
  //   }
  // } 

  // const debouncedFunction = debounce((event) => {
  //   setLocalSearch(event.target.value)
  //   console.log(event.target.value);
  // })

  const optimizedDebounce = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <Select 
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          <Select
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <Select
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
