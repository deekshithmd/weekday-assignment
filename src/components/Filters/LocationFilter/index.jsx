import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

export const LocationFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { locations } = useSelector((state) => state.jobs);

    const handleKey = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const selectedList = [...selectedFilters?.locations];
            selectedList?.pop();
            setSelectedFilters({ ...selectedFilters, locations: selectedList })
        }
    }

    return (
        <div className="filter-wrapper">
            <div className="filter-container">
                <div className="selected-filters">
                    {
                        selectedFilters?.locations?.map(location => {
                            return <div key={location} className="selected-filter">{location}<div className="cancel-icon-container"><IoClose onClick={() => setSelectedFilters({ ...selectedFilters, locations: selectedFilters?.locations?.filter(l => l !== location) })} /></div></div>
                        })
                    }
                </div>
                <input type="text" placeholder='Job Location' onFocus={() => setOpenFilter('LOCATION')} onChange={(e) => {
                    setFilterSearch({ ...filterSearch, location: e.target.value })
                }} onKeyDown={handleKey} /><FaAngleDown onClick={() => setOpenFilter(openFilter === 'LOCATION' ? '' : 'LOCATION')} />
            </div>
            {
                openFilter === 'LOCATION' && <div className="option-list">
                    {
                        locations?.map(location => {
                            return (
                                filterSearch?.location?.length > 0 ?
                                    location?.toLowerCase()?.includes(filterSearch?.location?.toLowerCase()) && <p key={location} onClick={(e) => {
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
    )
}