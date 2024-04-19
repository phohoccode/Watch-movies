import { $, $$, header, footer } from "../utils/base.js"
import renderHeader from "../components/renderHeader.js"
import movies from "../components/movies.js"
import fetchAPI from "../utils/fectchAPI.js"
import storage from "../utils/localStorage.js"
import handleHeader from "../utils/handleHeader.js"
import handleFeedback from "../utils/handleFeedback.js"
import handleWatchMovie from "../utils/handleWatchMovie.js"
import componentRendering from "../utils/componentRendering.js"
import toastMessege from "../utils/toastMessage.js"
import initLoader from "../utils/initLoader.js"
import hanleWhenDowloadingMoviesFail from "../utils/handleWhenDownloadingMoviesFails.js"

const detailMovie = (() => {
    let page = 0
    const allMovie = $('.all-movie')
    const paginations = $('.paginations')
    const totalPages = Math.round(storage.get('total-page') / 2)

    return {
        async fetchApi(currentPage) {
            const API_KEY = `${storage.get('link-api')}?page=${currentPage}&limit=20`
            try {
                const movieData = await fetchAPI(API_KEY)
                const titleHead = movieData.data.seoOnPage.titleHead
                document.title = titleHead
                setTimeout(() => {
                    this.renderAllMovie(movieData.data, allMovie)
                }, 1000)
                history.pushState(null, '', `/Watch-movies/detailMovie-page.html?${movieData.data.breadCrumb[0].slug}`);
            } catch(error) {
                console.log(error)
                hanleWhenDowloadingMoviesFail()
            }
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
                if (page) {
                    const index = page.dataset.index
                    if (!index) {
                        console.log('Index not found!')
                        return
                    }
                    this.handleClickChangePage(page, index)
                }
            })
        },
        handleClickChangePage(page, index) {
            this.fetchApi(index)
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            this.setActivePage(page)
            setTimeout(() => {
                toastMessege({
                    title: 'Chuyển trang thành công!',
                    message: `Bạn đang ở trang thứ ${index}`,
                    type: 'success'
                })
            }, 2000)
        },
        start() {
            renderHeader(header)
            initLoader(2000)
            this.fetchApi(page)
            componentRendering('./src/components/footer.html', footer)
            setTimeout(() => {
                this.renderPaginations(totalPages)
                this.setActivePageDefault()
            }, 3000)
            this.handleEvent()
        }
    }
})()
detailMovie.start()
