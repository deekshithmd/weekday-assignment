import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

export const ExperienceFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { minExperience } = useSelector((state) => state.jobs);

    return (
        <div className="filter-wrapper">
            <div className="filter-container">
                {selectedFilters?.experience ? <div className="single-filter">
                    <p>{selectedFilters?.experience}</p>
                    <IoClose onClick={() => setSelectedFilters({ ...selectedFilters, experience: null })} />
                </div>
                    :
                    <input type="text" value={selectedFilters?.experience} placeholder='Experience' onFocus={() => setOpenFilter('EXPERIENCE')} onChange={(e) => {
                        setFilterSearch({ ...filterSearch, experience: e.target.value })
                    }} />
                }
                <FaAngleDown onClick={() => setOpenFilter(openFilter === 'EXPERIENCE' ? '' : 'EXPERIENCE')} />
            </div>
            {
                openFilter === 'EXPERIENCE' && <div className="option-list">
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
    )
}