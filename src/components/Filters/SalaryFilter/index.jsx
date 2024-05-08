import { useSelector } from "react-redux";

export const SalaryFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { minSalary } = useSelector((state) => state.jobs);

    return (
        <div>
            <div>
                {selectedFilters?.salary ? <div>
                    <p>{selectedFilters?.salary?.label}<span onClick={() => setSelectedFilters({ ...selectedFilters, salary: null })}>X</span></p>
                </div>
                    :
                    <input type="text" value={selectedFilters?.salary?.label} placeholder='salary' onFocus={() => setOpenFilter('SALARY')} onChange={(e) => {
                        setFilterSearch({ ...filterSearch, salary: e.target.value })
                    }} />
                }
                <span onClick={() => setOpenFilter(openFilter === 'SALARY' ? '' : 'SALARY')}>V</span>
            </div>
            {
                openFilter === 'SALARY' && <div>
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