import fetchAPI from "./fectchAPI.js"
import storage from "./localStorage.js"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const changePages = $$('.change-page')
const content = $('.content')
const searchButton = $('.search button')
const sendMail = $('.send-mail')

const handleClickButtonSearch = (element) => {
    const inputSearch = $('.search input')
    element.addEventListener('click', () => {
        const valueSearch = inputSearch.value
        if (valueSearch !== '') {
            storage.set('value-search', valueSearch)
            window.location.href = './search-page.html'
        }
    })
}

const handleFetchApi = (element) => {
    const linkApi = element.dataset.api
    fetchAPI(linkApi)
        .then(data => {
            console.log(data)
            const totalPage = data.data.params.pagination.totalPages
            storage.set('link-api', linkApi)
            storage.set('total-page', totalPage)
            window.location.href = './detailMovie-page.html'
        })
        .catch(error => console.error('Error fetching API:', error))
}

const handleClickChangePage = (elements) => {
    elements.forEach(element => {
       if (element) {
        element.addEventListener('click', (e) => {
            handleFetchApi(element)
        })
       }
    })
}

const handleClickWatchMovie = (element) => {
    element.addEventListener('click', (e) => {
        const movie = e.target.closest('.movie')
        const watchAllMovie = e.target.closest('.watch-all')
        if (movie) {
            console.log('done')
            const linkSlug = movie.dataset.slug
            storage.set('link-slug', linkSlug)
        }

        if (watchAllMovie) {
            handleFetchApi(watchAllMovie)
        }
    })
}

const handleFeedback = (element) => {
    element.addEventListener('click', () => {
        const messageValue = $('form textarea').value
        if (messageValue !== '') {
            window.location.href = `mailto:qviet092@gmail.com?subject=&body=${encodeURIComponent(messageValue)}`;
        } else {
            console.log('Error')
        }
    })
}

export {
    $, $$, changePages, content, searchButton, sendMail,
    handleClickButtonSearch,
    handleClickChangePage,
    handleFetchApi,
    handleClickWatchMovie,
    handleFeedback
}
