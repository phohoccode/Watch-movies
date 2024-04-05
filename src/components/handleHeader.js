import { $ } from "../js/base.js"
import storage from "../utils/localStorage.js"
import handleDetailPages from "../utils/handleDetailPages.js"

const handleSearch = (inputSearchValue) => {
    if (inputSearchValue !== '') {
        storage.set('value-search', inputSearchValue);
        window.location.href = './search-page.html';
    }
};

const header = $('.main-page > header')
const handleHeader = () => {
    header.addEventListener('click', (e) => {
        const searchButton = e.target.closest('.search button');
        const changePage = e.target.closest('.change-page');
        const barsButton = e.target.closest('.bars');
        const closeButton = e.target.closest('.close');
        const menuHeader = $('.menu-header');

        if (searchButton) {
            const inputSearchValue = searchButton.previousElementSibling.value
            handleSearch(inputSearchValue);
        }
        if (changePage) {
            handleDetailPages(changePage);
        }
        if (barsButton) {
            menuHeader.classList.add('active');
        }
        if (closeButton) {
            menuHeader.classList.remove('active');
        }
    });
};

export  {header, handleHeader};
