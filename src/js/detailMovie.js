import fetchAPI from "../utils/fectchAPI.js"
import movies from "../components/movies.js"
import storage from "../utils/localStorage.js"
import {$,$$} from "./base.js"
import {header, handleHeader} from "../components/handleHeader.js"
import {footer, handleFeedback}  from "../components/handleFooter.js"
import handleWatchMovie from "../utils/handleWatchMovie.js"
import componentRendering from "../utils/componentRendering.js"
import handleAddMovieToWatchLater from "../utils/handleAddMovieToWatchLater.js"
import handleRemoveMovieToWatchLater from "../utils/handleRemoveMovieToWatchLater.js"

const detailMovie = (() => {
    let page = 0
    const allMovie = $('.all-movie')
    const paginations = $('.paginations')
    const totalPages = Math.round(storage.get('total-page') / 2)

    return {
        fetchApi(currentPage) {
            const API_KEY = `${storage.get('link-api')}?page=${currentPage}&limit=20`
            fetchAPI(API_KEY)
                .then(data => {
                    console.log(data.data)
                    this.renderAllMovie(data.data, allMovie)
                    document.title = data.data.seoOnPage.titleHead
                })
        },
        renderAllMovie(data, element) {
            const htmls = `
                <header>
                    <div class="title-name">Danh sách tất cả phim ${data.titlePage}</div>
                    <span class="current-page">${data.breadCrumb[1].name}</span>
                </header>
                <div class="movies">
                    ${movies(data.items)}
                </div>
            `
            element.innerHTML = htmls
        },
        renderPaginations(quantity) {
            for (let i = 0; i < quantity; i++) {
                const page = document.createElement('div')
                page.classList.add('page')
                page.innerText = i + 1
                page.setAttribute('data-index', i + 1)
                paginations.appendChild(page)
                page.addEventListener('click', () => {
                    const index = page.dataset.index
                    this.fetchApi(index)
                    this.setActivePage(page)
                })
            }
        },
        setActivePage(element) {
            $('.page.active').classList.remove('active')
            element.classList.add('active')
        },
        setActivePageDefault() {
            $$('.page')[0].classList.add('active')
        },
        handleEvent() {
            handleHeader()
            handleWatchMovie()
            handleFeedback()
        },
        start() {
            componentRendering('./src/components/header.html', header)
            componentRendering('./src/components/footer.html', footer)
            this.fetchApi(page)
            this.renderPaginations(totalPages)
            this.setActivePageDefault()
            this.handleEvent()
        }
    }
})()
detailMovie.start()
