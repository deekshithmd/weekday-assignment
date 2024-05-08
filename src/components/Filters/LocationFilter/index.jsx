import { useSelector } from "react-redux";

export const LocationFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { locations } = useSelector((state) => state.jobs);

    return (
        <div>
            <div>
                {
                    selectedFilters?.locations?.map(location => {
                        return <span key={location}>{location}<span onClick={() => setSelectedFilters({ ...selectedFilters, locations: selectedFilters?.locations?.filter(l => l !== location) })}>x</span></span>
                    })
                }
                <input type="text" placeholder='location' onFocus={() => setOpenFilter('LOCATION')} onChange={(e) => {
                    setFilterSearch({ ...filterSearch, location: e.target.value })
                }} /><span onClick={() => setOpenFilter(openFilter === 'LOCATION' ? '' : 'LOCATION')}>V</span>
            </div>
            {
                openFilter === 'LOCATION' && <div>
                    {
                        locations?.map(location => {
                            return (
                                filterSearch?.location?.length > 0 ?
                                    location?.tolLowerCase()?.includes(filterSearch?.location?.toLowerCase()) && <p key={location} onClick={(e) => {
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