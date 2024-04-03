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
            const linkSlug = movie.dataset.slug
            storage.set('link-slug', linkSlug)
        }
        if (watchAllMovie) {
            handleFetchApi(watchAllMovie)
        }
    })
}

const listOfMoviesToWatchLater = []
const handleClickAddMovie = (element) => {
    const addMovie = element.parentNode
    const linkSlug = `https://phimapi.com/phim/${addMovie.dataset.slug}`
    addMovie.classList.add('active')
    if (linkSlug) {
        fetchAPI(linkSlug)
        .then( data => {
            if (!listOfMoviesToWatchLater.some(item => item.slug === data.movie.slug)) {
                listOfMoviesToWatchLater.push(data.movie)
                storage.set('listMoviesToWatchLater', listOfMoviesToWatchLater)
            }
        })
    }
}

const handleClickRemoveMovie = (element) => {
    const addMovie = element.parentNode
    const slug = addMovie.dataset.slug
    addMovie.classList.remove('active')
    const listOfMoviesToWatchLater = storage.get('listMoviesToWatchLater')
    let listOfMoviesToWatch = listOfMoviesToWatchLater.filter(item => item.slug !== slug)
    storage.set('listMoviesToWatchLater', listOfMoviesToWatch)
}

const cacheEpisodeDetails = (data) => {
    const link_embed = []
    const titlePage = data.episodes[0].server_data[0].filename
    document.title = titlePage
    data.episodes[0].server_data.forEach(link => link_embed.push(link))
    storage.set('title-page', titlePage)
    storage.set('link_embed', link_embed)
    storage.set('movie-name', data.movie.name)
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

window.handleClickAddMovie = handleClickAddMovie
window.handleClickRemoveMovie = handleClickRemoveMovie

export {
    $, $$, content, header, footer,
    renderComponent,
    handleClickHeader,
    handleFetchApi,
    handleClickAddMovie,
    handleClickRemoveMovie,
    cacheEpisodeDetails,
    handleClickWatchMovie,
    handleFeedback
}
