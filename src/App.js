import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [jobs, setJobs] = useState([])

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": 10,
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
        setJobs(JSON.parse(result)?.jdList)
      })
      .catch((error) => console.error(error));
  }, [])

  return (
    <div className="App">
      {
        jobs.map(job =>
          <div key={job?.jdUid}>

            <div>
              <img src={job?.logoUrl} alt={job?.companyName} />
              <span>{job?.companyName}</span>
            </div>
            <span>{job?.jobRole}</span>
            <div>
              <p>{job?.jobDetailsFromCompany}</p>
            </div>
            <a href={job?.jdLink} rel='noreferrer' target='_blank'>Apply</a>
          </div>
        )
      }
    </div>
  );
}

export default App;
