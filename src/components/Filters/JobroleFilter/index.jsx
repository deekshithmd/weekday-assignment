import { useSelector } from "react-redux";

export const JobroleFilter = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {
    const { jobRoles } = useSelector((state) => state.jobs);

    return (
        <div>
            <div>
                {
                    selectedFilters?.roles?.map(role => {
                        return <span key={role}>{role}<span onClick={() => setSelectedFilters({ ...selectedFilters, roles: selectedFilters?.roles?.filter(r => r !== role) })}>x</span></span>
                    })
                }
                <input type="text" placeholder='role' onFocus={() => setOpenFilter('ROLE')} onChange={(e) => {
                    setFilterSearch({ ...filterSearch, role: e.target.value })

                }} /><span onClick={() => setOpenFilter(openFilter === 'ROLE' ? '' : 'ROLE')}>V</span>
            </div>
            {
                openFilter === 'ROLE' && <div>
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