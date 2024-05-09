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
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    company: '',
    locations: [],
    experience: null,
    salary: null
  })
  const endRef = useRef(null)
  const dispatch = useDispatch();

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

  // https://gist.github.com/anubhavmalik/1733c9cec2aebde6ecd5bef8b906a690


  useEffect(() => {
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        dispatch(updateJobs(JSON.parse(result)?.jdList));
        updateFilters(JSON.parse(result)?.jdList)
      })
      .catch((error) => console.error(error));
  }, [pageLimit])

  useEffect(() => {
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

    const salaryFiltered = selectedFilters?.salary ? locationFiltered?.filter(job =>
      job?.minJdSalary >= selectedFilters?.salary?.value
    ) : locationFiltered

    const experienceFiltered = selectedFilters?.experience ? salaryFiltered?.filter(job =>
      job?.minExp >= selectedFilters?.experience
    ) : salaryFiltered

    const companyFiltered = selectedFilters?.company?.length > 0 ? experienceFiltered?.filter(job => job?.companyName?.toLowerCase()?.includes(selectedFilters?.company?.toLowerCase())) : experienceFiltered;

    dispatch(updateFilteredJobs(companyFiltered))
  }, [selectedFilters, jobsList])

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

  return (
    <main>
      <div className='page-content'>
        <Header />
        {/* filter for jobs */}
        <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} setFilterSearch={setFilterSearch} filterSearch={filterSearch} openFilter={openFilter} setOpenFilter={setOpenFilter} />
        {/* rendering job list */}
        <JobList jobsList={filteredJobList?.length > 0 ? filteredJobList : jobsList} />
        {/* ref to detect end of list */}
        <div ref={endRef} />
      </div>
    </main>
  );
}

export default App;
