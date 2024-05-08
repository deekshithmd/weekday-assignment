import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobs, updateFilteredJobs, updateJobRoles, updateLocations } from './features/jobs/jobSlice';
import './App.css';
import { JobList } from './components/JobList';

function App() {
  const { jobsList, filteredJobList, jobRoles, locations, minSalary, minExperience } = useSelector((state) => state.jobs);
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
      if (endRef?.current) {
        observer.unobserve(endRef.current);
      }
    }
  }, [endRef])

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

  console.log('jobs', filteredJobList)

  return (
    <div>
      <div className='filter-container'>
        <div>
          <div>
            {selectedFilters?.experience ? <div>
              <p>{selectedFilters?.experience}<span onClick={() => setSelectedFilters({ ...selectedFilters, experience: null })}>X</span></p>
            </div>
              :
              <input type="text" value={selectedFilters?.experience} placeholder='experience' onFocus={() => setOpenFilter('EXPERIENCE')} onChange={(e) => {
                setFilterSearch({ ...filterSearch, experience: e.target.value })
              }} />
            }
            <span onClick={() => setOpenFilter(openFilter === 'EXPERIENCE' ? '' : 'EXPERIENCE')}>V</span>
          </div>
          {
            openFilter === 'EXPERIENCE' && <div>
              {
                minExperience?.map(experience => {
                  return (
                    filterSearch?.experience > 0 ?
                      String(experience).toLowerCase()?.includes(filterSearch?.experience?.toLowerCase()) && <p key={experience} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFilters({ ...selectedFilters, experience })
                        setOpenFilter('')
                      }}>{experience}</p>
                      :
                      <p key={experience} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFilters({ ...selectedFilters, experience })
                        setOpenFilter('')
                      }}>{experience}</p>
                  )
                })
              }
            </div>
          }
        </div>
        <div>
          <div>
            {selectedFilters?.salary ? <div>
              <p>{selectedFilters?.salary?.label}<span onClick={() => setSelectedFilters({ ...selectedFilters, salary: null })}>X</span></p>
            </div>
              :
              <input type="text" value={selectedFilters?.salary?.label} placeholder='salary' onFocus={() => setOpenFilter('SALARY')} onChange={(e) => {
                setFilterSearch({ ...filterSearch, salary: e.target.value })
              }} />
            }
            <span onClick={() => setOpenFilter(openFilter === 'SALARY' ? '' : 'SALARY')}>V</span>
          </div>
          {
            openFilter === 'SALARY' && <div>
              {
                minSalary?.map(salary => {
                  return (
                    filterSearch?.salary > 0 ?
                      salary?.label?.toLowerCase()?.includes(filterSearch?.salary?.toLowerCase()) && <p key={salary?.label} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFilters({ ...selectedFilters, salary: salary })
                        setOpenFilter('')
                      }}>{salary?.label}</p>
                      :
                      <p key={salary?.value} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFilters({ ...selectedFilters, salary: salary })
                        setOpenFilter('')
                      }}>{salary?.label}</p>
                  )
                })
              }
            </div>
          }
        </div>
        <div>
          <div>
            {
              selectedFilters?.locations?.map(location => {
                return <span key={location}>{location}<span onClick={() => setSelectedFilters({ ...selectedFilters, locations: selectedFilters?.locations?.filter(l => l !== location) })}>x</span></span>
              })
            }
            <input type="text" placeholder='location' onFocus={() => setOpenFilter('LOCATION')} onChange={(e) => {
              setFilterSearch({ ...filterSearch, location: e.target.value })
            }} /><span onClick={() => setOpenFilter(openFilter === 'LOCATION' ? '' : 'LOCATION')}>V</span>
          </div>
          {
            openFilter === 'LOCATION' && <div>
              {
                locations?.map(location => {
                  return (
                    filterSearch?.location?.length > 0 ?
                      location?.tolLowerCase()?.includes(filterSearch?.location?.toLowerCase()) && <p key={location} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFilters({ ...selectedFilters, locations: [...selectedFilters?.locations, location] })
                        setOpenFilter('')
                      }}>{location}</p>
                      :
                      <p key={location} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFilters({ ...selectedFilters, locations: [...selectedFilters?.locations, location] })
                        setOpenFilter('')
                      }}>{location}</p>
                  )
                })
              }
            </div>
          }
        </div>
        <div>
          <input type="text" placeholder='company' onChange={(e) => setSelectedFilters({ ...selectedFilters, company: e.target.value })} />
        </div>
        <div>
          <div>
            {
              selectedFilters?.roles?.map(role => {
                return <span key={role}>{role}<span onClick={() => setSelectedFilters({ ...selectedFilters, roles: selectedFilters?.roles?.filter(r => r !== role) })}>x</span></span>
              })
            }
            <input type="text" placeholder='role' onFocus={() => setOpenFilter('ROLE')} onChange={(e) => {
              setFilterSearch({ ...filterSearch, role: e.target.value })

            }} /><span onClick={() => setOpenFilter(openFilter === 'ROLE' ? '' : 'ROLE')}>V</span>
          </div>
          {
            openFilter === 'ROLE' && <div>
              {
                jobRoles?.map(role => {
                  return (
                    filterSearch?.role?.length > 0 ?
                      role?.includes(filterSearch?.role) && <p key={role} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFilters({ ...selectedFilters, roles: [...selectedFilters?.roles, role] })
                        setOpenFilter('')
                      }}>{role}</p>
                      :
                      <p key={role} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFilters({ ...selectedFilters, roles: [...selectedFilters?.roles, role] })
                        setOpenFilter('')
                      }}>{role}</p>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
      <JobList jobsList={filteredJobList?.length > 0 ? filteredJobList : jobsList} />
      <div ref={endRef} />
    </div>
  );
}

export default App;
