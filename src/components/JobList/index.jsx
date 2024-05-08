import { useState, useRef, useEffect } from "react"
import { JobCard } from "../JobCard"
import { Modal } from "../Modal";
import "./joblist.css"

export const JobList = ({ jobsList }) => {
    const [showJobDescription, setShowJobDescription] = useState('');
    const outsideRef = useRef(null);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (outsideRef?.current && !outsideRef?.current?.contains(e.target)) {
                setShowJobDescription('')
            }
        }, true)
    }, [])

    return (
        <div className="jobs-container">
            {
                jobsList.map(job =>
                    <JobCard key={job?.jdUid} job={job} handleShowJobDescription={setShowJobDescription} />
                )
            }
            {
                showJobDescription?.length > 0 &&
                <Modal>
                    <div ref={outsideRef} className="description">
                        {
                            showJobDescription
                        }
                    </div>
                </Modal>
            }
        </div>
    )
}