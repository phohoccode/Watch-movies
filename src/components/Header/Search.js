import { handleResetValue, handleButtonSearch, handleInputSearch } from './handleHeader.js'
import { $ } from "../../utils/base.js"

const Search = () => {
    return `
        <input
            onkeydown="handleInputSearch(event)"
            type="text" placeholder="Tìm kiếm..."
        >
        <button
            onclick="handleButtonSearch($('.search input'))"
            class="search-btn"
        >
            <i class="fa-light fa-magnifying-glass"></i>
        </button>
        <button
            onclick="handleResetValue($('.search input'))"
            class="reset-value"
        >
            <i class="fa-light fa-xmark"></i>
        </button>
    `
}
export default Search
