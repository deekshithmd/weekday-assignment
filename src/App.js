import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobs } from './features/jobs/jobSlice';
import './App.css';

function App() {
  const { jobsList } = useSelector((state) => state.jobs);
  const [pageLimit, setPageLimit] = useState(10);
  const [showMoreIds, setShowMoreIds] = useState([]);
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
        dispatch(updateJobs(JSON.parse(result)?.jdList))
      })
      .catch((error) => console.error(error));
  }, [pageLimit])

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

  return (
    <div className="jobs-container">
      {
        jobsList.map(job =>
          <div key={job?.jdUid} className='job-card'>

            <div>
              <img src={job?.logoUrl} alt={job?.companyName} className='company-logo' />
              <span>{job?.companyName}</span>
            </div>
            <span>{job?.jobRole}</span>
            <div>
              <p>{showMoreIds?.includes(job?.jdUid) ? job?.jobDetailsFromCompany : job?.jobDetailsFromCompany?.slice(0, 300)}</p>
              <p onClick={() => setShowMoreIds(showMoreIds?.includes(job?.jdUid) ? [...showMoreIds?.filter(id => id !== job?.jdUid)] : [...showMoreIds, job?.jdUid])}>{showMoreIds?.includes(job?.jdUid) ? 'Show Less' : 'Show More'}</p>
            </div>
            <a href={job?.jdLink} rel='noreferrer' target='_blank'>Apply</a>
          </div>
        )
      }
      <div ref={endRef} />
    </div>
  );
}

export default App;
