import { $, header } from "../utils/base.js"
import storage from "./localStorage.js"
import handleDetailPages from "./handleDetailPages.js"
import handleEscapeHTML from "./handleEscapeHTML.js"

const handleSearch = (inputSearchValue) => {
    if (inputSearchValue !== '') {
        storage.set('value-search', inputSearchValue)
        window.location.href = './search-page.html'
    }
}

const handleHeader = () => {
    header.addEventListener('click', (e) => {
        const menuHeader = $('.menu-header')
        const inputSearch = $('.search input')
        const searchButton = e.target.closest('.search-btn')
        const changePage = e.target.closest('.change-page')
        const barsButton = e.target.closest('.bars')
        const resetValue = e.target.closest('.reset-value')
        const closeButton = e.target.closest('.close')

        if (searchButton) {
            handleSearch(handleEscapeHTML(inputSearch.value))
        }
        if (resetValue) {
            inputSearch.value = ''
        }
        if (changePage) {
            handleDetailPages(changePage)
        }
        if (barsButton) {
            menuHeader.classList.add('active')
        }
        if (closeButton) {
            menuHeader.classList.remove('active')
        }
    })
}

export default handleHeader
