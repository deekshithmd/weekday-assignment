export const JobCard = ({ job, handleShowJobDescription }) => {
    return (
        <div key={job?.jdUid} className='job-card'>
            <div>
                <img src={job?.logoUrl} alt={job?.companyName} className='company-logo' />
                <span>{job?.companyName}</span>
            </div>
            <span>{job?.jobRole}</span>
            <span>{job?.location}</span>
            <div>
                <p>{job?.jobDetailsFromCompany?.slice(0, 300)}</p>
                <p onClick={() => handleShowJobDescription(job?.jobDetailsFromCompany)}>Show More</p>
            </div>
            <p>Min Experience Required : {job?.minExp ? `${job?.minExp} Years` : 'Not mentioned'}</p>
            <a href={job?.jdLink} rel='noreferrer' target='_blank'>Apply</a>
        </div>
    )
}