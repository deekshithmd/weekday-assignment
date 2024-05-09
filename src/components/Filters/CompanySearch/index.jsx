
export const CompanySearch = ({ setSelectedFilters, selectedFilters }) => {
    return (
        <div className="filter-container">
            {selectedFilters?.company && <span className="input-heading">Company</span>}
            <input type="text" name="search" placeholder='Search Company Name' onChange={(e) => setSelectedFilters({ ...selectedFilters, company: e.target.value })} />
        </div>
    )
}