import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { DROPDOWN_STATES } from "../../../utils/contants";

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
                {selectedFilters?.locations?.length > 0 && <span className="input-heading">Job Location</span>}
                {selectedFilters?.locations?.length > 0 && <div className="selected-filters">
                    {
                        selectedFilters?.locations?.map(location => {
                            return <div key={location} className="selected-filter">{capitalizeFirstLetter(location)}<div className="cancel-icon-container"><IoClose onClick={() => setSelectedFilters({ ...selectedFilters, locations: selectedFilters?.locations?.filter(l => l !== location) })} className="remove" /></div></div>
                        })
                    }
                </div>
                }
                <input type="text" placeholder='Job Location' onFocus={() => setOpenFilter(DROPDOWN_STATES?.LOCATION)} onChange={(e) => {
                    setFilterSearch({ ...filterSearch, location: e.target.value })
                }} onKeyDown={handleKey} />
                <div className="left-border">
                    <FaAngleDown onClick={() => setOpenFilter(openFilter === DROPDOWN_STATES?.LOCATION ? '' : DROPDOWN_STATES?.LOCATION)} className="cursor-pointer" />
                </div>
            </div>
            {
                openFilter === DROPDOWN_STATES?.LOCATION && <div className="option-list">
                    {
                        locations?.map(location => {
                            return (
                                filterSearch?.location?.length > 0 ?
                                    location?.toLowerCase()?.includes(filterSearch?.location?.toLowerCase()) && <p key={location} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, locations: [...selectedFilters?.locations, location] })
                                        setOpenFilter('')
                                    }}>{capitalizeFirstLetter(location)}</p>
                                    :
                                    <p key={location} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, locations: [...selectedFilters?.locations, location] })
                                        setOpenFilter('')
                                    }}>{capitalizeFirstLetter(location)}</p>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}