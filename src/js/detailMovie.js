import fetchAPI from "./fectchAPI.js"
import { $, $$, content, header, footer, renderComponent, handleClickHeader, handleClickWatchMovie, handleFeedback } from "./base.js"
import movies from "./component/movies.js"
import storage from "./localStorage.js"

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
            handleClickWatchMovie(content)
            handleClickHeader(header)
            handleFeedback(footer)
        },
        start() {
            renderComponent('./componentHTML/header.html', header)
            renderComponent('./componentHTML/footer.html', footer)
            this.fetchApi(page)
            this.renderPaginations(totalPages)
            this.setActivePageDefault()
            this.handleEvent()
        }
    }
})()
detailMovie.start()
