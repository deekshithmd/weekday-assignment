import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { DROPDOWN_STATES } from "../../../utils/contants"

export const ExperienceFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { minExperience } = useSelector((state) => state.jobs);

    return (
        <div className="filter-wrapper">
            <div className="filter-container">
                {selectedFilters?.experience && <span className="input-heading">Experience</span>}
                {selectedFilters?.experience ? <div className="single-filter">
                    <p>{selectedFilters?.experience}</p>
                    <IoClose onClick={() => setSelectedFilters({ ...selectedFilters, experience: null })} className="cursor-pointer" />
                </div>
                    :
                    <input type="text" value={selectedFilters?.experience} placeholder='Experience' onFocus={() => setOpenFilter(DROPDOWN_STATES?.EXPERIENCE)} onChange={(e) => {
                        setFilterSearch({ ...filterSearch, experience: e.target.value })
                    }} />
                }
                <FaAngleDown onClick={() => setOpenFilter(openFilter === DROPDOWN_STATES?.EXPERIENCE ? '' : DROPDOWN_STATES?.EXPERIENCE)} className="cursor-pointer" />
            </div>
            {
                openFilter === DROPDOWN_STATES?.EXPERIENCE && <div className="option-list">
                    {
                        minExperience?.map(experience => {
                            return (
                                filterSearch?.experience > 0 ?
                                    String(experience).toLowerCase()?.includes(filterSearch?.experience?.toLowerCase()) && <p key={experience} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, experience })
                                        setOpenFilter('')
                                    }}>{experience} years</p>
                                    :
                                    <p key={experience} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, experience })
                                        setOpenFilter('')
                                    }}>{experience} years</p>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}