import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

export const SalaryFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { minSalary } = useSelector((state) => state.jobs);

    return (
        <div className="filter-wrapper">
            <div className="filter-container">
                {selectedFilters?.salary ? <div className="single-filter">
                    <p >{selectedFilters?.salary?.label}</p>
                    <IoClose onClick={() => setSelectedFilters({ ...selectedFilters, salary: null })} />
                </div>
                    :
                    <input type="text" value={selectedFilters?.salary?.label} placeholder='Minimum Base Pay Salary' onFocus={() => setOpenFilter('SALARY')} onChange={(e) => {
                        setFilterSearch({ ...filterSearch, salary: e.target.value })
                    }} />
                }
                <FaAngleDown onClick={() => setOpenFilter(openFilter === 'SALARY' ? '' : 'SALARY')} />
            </div>
            {
                openFilter === 'SALARY' && <div className="option-list">
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