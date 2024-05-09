import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobs, updateFilteredJobs, updateJobRoles, updateLocations } from './features/jobs/jobSlice';
import './App.css';
import { JobList } from './components/JobList';
import { Header } from './components/Header';
import { Filters } from './components/Filters';

function App() {
  const { jobsList, filteredJobList, jobRoles, locations } = useSelector((state) => state.jobs);
  const [pageLimit, setPageLimit] = useState(10);
  const [filterSearch, setFilterSearch] = useState({ role: '', experience: null, location: '', salary: null })
  const [openFilter, setOpenFilter] = useState('');
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    company: '',
    locations: [],
    experience: null,
    salary: null
  })
  const endRef = useRef(null)
  const dispatch = useDispatch();

  // Api call
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": pageLimit,
    "offset": 0
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  };

  useEffect(() => {
    setLoadingJobs(true)
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        dispatch(updateJobs(JSON.parse(result)?.jdList));
        updateFilters(JSON.parse(result)?.jdList);
        setLoadingJobs(false);
      })
      .catch((error) => console.error('Error while fetching jobs', error));
  }, [pageLimit])

  // Applying filters on data

  useEffect(() => {
    // Job role based filter
    const roleFiltered = selectedFilters?.roles?.length > 0 ? jobsList?.filter(job => {
      let isMatched = false;
      for (let i = 0; i < selectedFilters?.roles?.length; i++) {
        if (job?.jobRole?.includes(selectedFilters.roles[i])) {
          isMatched = true;
          break;
        }
      }
      return isMatched;
    }) : jobsList

    // Location based filter
    const locationFiltered = selectedFilters?.locations?.length > 0 ? roleFiltered?.filter(job => {
      let isMatched = false;
      for (let i = 0; i < selectedFilters?.locations?.length; i++) {
        if (job?.location?.toLowerCase()?.includes(selectedFilters.locations[i]?.toLowerCase())) {
          isMatched = true;
          break;
        }
      }
      return isMatched;
    }) : roleFiltered

    // Salary based filter
    const salaryFiltered = selectedFilters?.salary ? locationFiltered?.filter(job =>
      job?.minJdSalary >= selectedFilters?.salary?.value
    ) : locationFiltered

    // Experience based filter
    const experienceFiltered = selectedFilters?.experience ? salaryFiltered?.filter(job =>
      job?.minExp >= selectedFilters?.experience
    ) : salaryFiltered

    // Company based filter
    const companyFiltered = selectedFilters?.company?.length > 0 ? experienceFiltered?.filter(job => job?.companyName?.toLowerCase()?.includes(selectedFilters?.company?.toLowerCase())) : experienceFiltered;

    dispatch(updateFilteredJobs(companyFiltered))
  }, [selectedFilters, jobsList])

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setPageLimit(pageLimit => pageLimit + 10);
        }
      })
    if (endRef?.current) {
      observer.observe(endRef.current);
    }

    return () => {
      observer.disconnect();
    }
  }, [])

  // Updating filters
  const updateFilters = (jobs) => {
    let locationList = [...locations];
    let jobRoleList = [...jobRoles];
    jobs?.forEach(job => {
      if (!locationList?.includes(job?.location)) {
        locationList.push(job?.location)
      }
      if (!jobRoleList?.includes(job?.jobRole)) {
        jobRoleList.push(job?.jobRole)
      }
    })
    dispatch(updateJobRoles(jobRoleList))
    dispatch(updateLocations(locationList))
  }

  const isFilterSelected = () => {
    return (selectedFilters?.roles?.length > 0 || selectedFilters?.locations?.length > 0 || selectedFilters?.company?.length > 0 || selectedFilters?.salary > 0 || selectedFilters?.experience > 0)
  }

  return (
    <main>
      <div className='page-content'>
        <Header />
        {/* filter for jobs */}
        <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} setFilterSearch={setFilterSearch} filterSearch={filterSearch} openFilter={openFilter} setOpenFilter={setOpenFilter} />
        {/* rendering job list */}
        <JobList jobsList={isFilterSelected() ? filteredJobList : jobsList} selectedFilters={selectedFilters} />
        {/* ref to detect end of list */}
        <div ref={endRef} />
        {
          loadingJobs && <h2 className='loader'>Loading Jobs...</h2>
        }
      </div>
    </main>
  );
}

export default App;
