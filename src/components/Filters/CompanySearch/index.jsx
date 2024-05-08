export const CompanySearch = ({ setSelectedFilters, selectedFilters }) => {
    return (
        <div>
            <input type="text" placeholder='company' onChange={(e) => setSelectedFilters({ ...selectedFilters, company: e.target.value })} />
        </div>
    )
}