import fetchAPI from "./fectchAPI.js"
import { fectchTextHtml } from "./fectchAPI.js"
import storage from "./localStorage.js"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const header = $('.main-page > header')
const content = $('.content')
const footer = $('footer')


const renderComponent = (url, element) => {
    fectchTextHtml(url)
        .then(data => {
            element.innerHTML = data
        })
}

const handleClickHeader = (element) => {
    element.addEventListener('click', (e) => {
        console.log(e)
        const searchButton = e.target.closest('.search button')
        const changePage = e.target.closest('.change-page')
        const bars = e.target.closest('.bars')
        const close = e.target.closest('.close')
        const menuHeader = $('.menu-header')
        if (searchButton) {
            const inputSearch = searchButton.previousElementSibling
            if (inputSearch.value !== '') {
                storage.set('value-search', inputSearch.value)
                window.location.href = './search-page.html'
            }
        }
        
        if (changePage) {
            handleFetchApi(changePage)
        }
        
        if (bars) {
            menuHeader.classList.add('active')
        }

        if (close) {
            menuHeader.classList.remove('active')
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
    element.addEventListener('click', (e) => {
        const sendMail = e.target.closest('.send-mail')
        if (sendMail) {
            const messageValue = $('form textarea').value
            if (messageValue !== '') {
                window.location.href = `mailto:qviet092@gmail.com?subject=&body=${encodeURIComponent(messageValue)}`
            } else {
                console.log('Error')
            }
        }
    })
}

export {
    $, $$, content, header, footer,
    renderComponent,
    handleClickHeader,
    handleFetchApi,
    handleClickWatchMovie,
    handleFeedback
}
