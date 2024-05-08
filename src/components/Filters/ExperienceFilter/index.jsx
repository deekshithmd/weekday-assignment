import { useSelector } from "react-redux";

export const ExperienceFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { minExperience } = useSelector((state) => state.jobs);

    return (
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
    )
}