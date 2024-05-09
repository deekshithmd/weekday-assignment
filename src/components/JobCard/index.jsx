import { FiExternalLink } from "react-icons/fi";
import './jobcard.css'

export const JobCard = ({ job, handleShowJobDescription }) => {
    return (
        <div key={job?.jdUid} className='job-card'>
            <div className='job-content'>
                <div className='heading'>
                    <img src={job?.logoUrl} alt={job?.companyName} className='company-logo' />
                    <span>{job?.companyName}</span>
                </div>
                <p className='role'>{job?.jobRole?.toLowerCase()?.includes('lead') ? job?.jobRole : `${job?.jobRole} Developer`}</p>
                <p className='location'>{job?.location}</p>
                <div>
                    <p className='role'>Job Description:</p>
                    <p className='job-description'>{job?.jobDetailsFromCompany?.slice(0, 299)}..<span onClick={() => handleShowJobDescription(job?.jobDetailsFromCompany)} className='show-more'>Show More</span></p>
                </div>
                <p className='font-medium'>Min Experience : <span className='font-normal'>{job?.minExp ? `${job?.minExp} Years` : 'Not mentioned'}</span></p>
            </div>
            <a href={job?.jdLink} rel='noreferrer' target='_blank' className='apply-button font-semibold'>Easy Apply <FiExternalLink /></a>
        </div>
    )
}