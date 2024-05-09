import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { DROPDOWN_STATES } from "../../../utils/contants";

export const JobroleFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { jobRoles } = useSelector((state) => state.jobs);

    // Delete role on backspace
    const handleKey = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const selectedList = [...selectedFilters?.roles];
            selectedList?.pop();
            setSelectedFilters({ ...selectedFilters, roles: selectedList })
        }
    }

    return (
        <div className="filter-wrapper">
            <div className="filter-container">
                {selectedFilters?.roles?.length > 0 && <span className="input-heading">Job Role</span>}
                {selectedFilters?.roles?.length > 0 && <div className="selected-filters">
                    {
                        selectedFilters?.roles?.map(role => {
                            return <div key={role} className="selected-filter">{capitalizeFirstLetter(role)}<div className="cancel-icon-container"><IoClose onClick={() => setSelectedFilters({ ...selectedFilters, roles: selectedFilters?.roles?.filter(r => r !== role) })} className="remove" /></div></div>
                        })
                    }
                </div>
                }
                <input type="text" placeholder='Roles' value={setFilterSearch.role} onFocus={() => setOpenFilter(DROPDOWN_STATES?.ROLE)} onChange={(e) => {
                    setFilterSearch({ ...filterSearch, role: e.target.value })
                }} onKeyDown={handleKey} />
                <div className="left-border">
                    <FaAngleDown onClick={() => setOpenFilter(openFilter === DROPDOWN_STATES?.ROLE ? '' : DROPDOWN_STATES?.ROLE)} className="cursor-pointer" />
                </div>
            </div>
            {/* Jon role list */}
            {
                openFilter === DROPDOWN_STATES?.ROLE && <div className="option-list">
                    {
                        jobRoles?.map(role => {
                            return (
                                // Checking whether serach matches with items in list
                                filterSearch?.role?.length > 0 ?
                                    role?.includes(filterSearch?.role) && <p key={role} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, roles: [...selectedFilters?.roles, role] })
                                        setOpenFilter('')
                                        setFilterSearch({ ...filterSearch, role: '' })
                                    }}>{capitalizeFirstLetter(role)}</p>
                                    :
                                    <p key={role} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, roles: [...selectedFilters?.roles, role] })
                                        setOpenFilter('')
                                    }}>{capitalizeFirstLetter(role)}</p>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}