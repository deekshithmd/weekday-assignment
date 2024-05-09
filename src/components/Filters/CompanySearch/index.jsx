import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

export const CompanySearch = ({ setSelectedFilters, selectedFilters }) => {
    return (
        <div className="filter-container">
            <input type="text" placeholder='Search Company Name' onChange={(e) => setSelectedFilters({ ...selectedFilters, company: e.target.value })} />
        </div>
    )
}