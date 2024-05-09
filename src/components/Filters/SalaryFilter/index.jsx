import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { DROPDOWN_STATES } from "../../../utils/contants";

export const SalaryFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { minSalary } = useSelector((state) => state.jobs);

    return (
        <div className="filter-wrapper">
            <div className="filter-container">
                {selectedFilters?.salary > 0 && <span className="input-heading">Salary</span>}
                {selectedFilters?.salary ? <div className="single-filter">
                    <p >{selectedFilters?.salary?.label}</p>
                    <IoClose onClick={() => setSelectedFilters({ ...selectedFilters, salary: null })} className="cursor-pointer" />
                </div>
                    :
                    <input type="text" value={selectedFilters?.salary?.label} placeholder='Minimum Base Pay Salary' onFocus={() => setOpenFilter(DROPDOWN_STATES?.SALARY)} onChange={(e) => {
                        setFilterSearch({ ...filterSearch, salary: e.target.value })
                    }} />
                }
                <div className="left-border">
                    <FaAngleDown onClick={() => setOpenFilter(openFilter === DROPDOWN_STATES?.SALARY ? '' : DROPDOWN_STATES?.SALARY)} className="cursor-pointer" />
                </div>
            </div>
            {
                openFilter === DROPDOWN_STATES?.SALARY && <div className="option-list">
                    {
                        minSalary?.map(salary => {
                            return (
                                filterSearch?.salary > 0 ?
                                    salary?.label?.toLowerCase()?.includes(filterSearch?.salary?.toLowerCase()) && <p key={salary?.label} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, salary: salary })
                                        setOpenFilter('')
                                    }}>{salary?.label}</p>
                                    :
                                    <p key={salary?.value} onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFilters({ ...selectedFilters, salary: salary })
                                        setOpenFilter('')
                                    }}>{salary?.label}</p>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}