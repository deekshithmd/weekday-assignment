import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { useClickAway } from "../../../hooks/useClickAway";
import { useRef } from "react";

export const JobroleFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { jobRoles } = useSelector((state) => state.jobs);
    // const roleRef = useRef(null);
    // useClickAway({ ref: roleRef, clickHandler: () => setOpenFilter('') })

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
                <div className="selected-filters">
                    {
                        selectedFilters?.roles?.map(role => {
                            return <div key={role} className="selected-filter">{role}<div className="cancel-icon-container"><IoClose onClick={() => setSelectedFilters({ ...selectedFilters, roles: selectedFilters?.roles?.filter(r => r !== role) })} className="remove" /></div></div>
                        })
                    }
                </div>
                <input type="text" placeholder='Roles' onFocus={() => setOpenFilter('ROLE')} onChange={(e) => {
                    setFilterSearch({ ...filterSearch, role: e.target.value })
                }} onKeyDown={handleKey} /><FaAngleDown onClick={() => setOpenFilter(openFilter === 'ROLE' ? '' : 'ROLE')} />
            </div>
            {
                openFilter === 'ROLE' && <div className="option-list">
                    {
                        jobRoles?.map(role => {
                            return (
                                filterSearch?.role?.length > 0 ?
                                    role?.includes(filterSearch?.role) && <p key={role} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, roles: [...selectedFilters?.roles, role] })
                                        setOpenFilter('')
                                    }}>{role}</p>
                                    :
                                    <p key={role} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, roles: [...selectedFilters?.roles, role] })
                                        setOpenFilter('')
                                    }}>{role}</p>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}