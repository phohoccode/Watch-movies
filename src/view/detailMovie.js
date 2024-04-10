import { $, $$, header, footer } from "../utils/base.js"
import renderHeader from "../components/renderHeader.js"
import movies from "../components/movies.js"
import fetchAPI from "../utils/fectchAPI.js"
import storage from "../utils/localStorage.js"
import handleHeader from "../utils/handleHeader.js"
import handleFeedback from "../utils/handleFeedback.js"
import handleWatchMovie from "../utils/handleWatchMovie.js"
import componentRendering from "../utils/componentRendering.js"
import handleAddMovieToWatchLater from "../utils/handleAddMovieToWatchLater.js"
import handleRemoveMovieToWatchLater from "../utils/handleRemoveMovieToWatchLater.js"
import toastMessege from "../utils/toastMessage.js"

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
                    const titleHead = data.data.seoOnPage.titleHead
                    if (!titleHead) {
                        console.log('Title head not found!')
                        return
                    }
                    document.title = data.data.seoOnPage.titleHead
                    this.renderAllMovie(data.data, allMovie)
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

            const paginations = $('.paginations')
            paginations.addEventListener('click', (e) => {
                const page = e.target.closest('.page')
                const index = page.dataset.index
                this.fetchApi(index)
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                this.setActivePage(page)
                setTimeout(() => {
                    toastMessege({
                        title: 'Chuyển trang thành công!',
                        message: `Bạn đang ở trang thứ ${index}`,
                        type: 'success'
                    })
                }, 1000)
            })
        },
        start() {
            renderHeader(header)
            componentRendering('./src/components/footer.html', footer)
            this.fetchApi(page)
            this.renderPaginations(totalPages)
            this.setActivePageDefault()
            this.handleEvent()
        }
    }
})()
detailMovie.start()
