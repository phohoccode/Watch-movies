import {$, header } from "../utils/base.js"
import storage from "./localStorage.js"
import handleDetailPages from "./handleDetailPages.js"

const handleSearch = (inputSearchValue) => {
    if (inputSearchValue !== '') {
        storage.set('value-search', inputSearchValue)
        window.location.href = './search-page.html'
    }
}

const handleHeader = () => {
    header.addEventListener('click', (e) => {
        const searchButton = e.target.closest('.search-btn')
        const changePage = e.target.closest('.change-page')
        const barsButton = e.target.closest('.bars')
        const closeButton = e.target.closest('.close')
        const resetValue = e.target.closest('.reset-value')
        const menuHeader = $('.menu-header')

        if (searchButton) {
            const inputSearchValue = $('.search input').value
            handleSearch(inputSearchValue)
        }
        if(resetValue) {
            const inputSearch = $('.search input')
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
