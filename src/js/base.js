const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const handleClickButtonSearch = () => {
    const inputSearch = $('.search input')
    const searchButton = $('.search button')
    console.log(searchButton)
    searchButton.addEventListener('click', () => {
        const valueSearch = inputSearch.value
        console.log(valueSearch)
        if (valueSearch !== '') {
            localStorage.setItem('value-search', JSON.stringify(valueSearch))
            window.location.href = './search-page.html'
        }
    })
}
const handleClickChangePage = () => {
    const menuHeader = $('.menu-header')
    menuHeader.addEventListener('click', (e) => {
        const headerItem = e.target.closest('.menu-header__item a')
        if (headerItem) {
            const linkApi = headerItem.dataset.api
            const dataType = headerItem.dataset.type
            localStorage.setItem('link-api', JSON.stringify(linkApi))
            localStorage.setItem('movie-type', JSON.stringify(dataType))
        }
    })
}

export {
    $, $$,
    handleClickButtonSearch,
    handleClickChangePage
}