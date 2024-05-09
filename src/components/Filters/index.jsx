import { CompanySearch } from "./CompanySearch";
import { ExperienceFilter } from "./ExperienceFilter";
import { SalaryFilter } from "./SalaryFilter";
import { LocationFilter } from "./LocationFilter";
import { JobroleFilter } from "./JobroleFilter";
import "./filters.css"

export const Filters = ({ selectedFilters, setSelectedFilters, filterSearch, setFilterSearch, openFilter, setOpenFilter }) => {

    return (
        <div className='filters-container'>
            <ExperienceFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} filterSearch={filterSearch} setFilterSearch={setFilterSearch} openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <SalaryFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} filterSearch={filterSearch} setFilterSearch={setFilterSearch} openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <LocationFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} filterSearch={filterSearch} setFilterSearch={setFilterSearch} openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <CompanySearch selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            <JobroleFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} filterSearch={filterSearch} setFilterSearch={setFilterSearch} openFilter={openFilter} setOpenFilter={setOpenFilter} />
        </div>
    )
}