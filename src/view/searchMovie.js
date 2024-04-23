import Header from "../components/Header/Header.js"
import Footer from "../components/Footer/Footer.js"
import Movies from "../components/Content/Movies.js"
import fetchAPI from "../utils/fectchAPI.js"
import { $, $$, header, footer } from "../utils/base.js"
import toastMessege from "../utils/toastMessage.js"
import storage from "../utils/localStorage.js"
import initLoader from "../utils/initLoader.js"
import hanleWhenDowloadingMoviesFail from "../utils/handleWhenDownloadingMoviesFails.js"

const searchPage = (() => {
    const allMovie = $('.all-movieFound')
    const seeMoreButton = $('.see-more')
    const valueSearch = storage.get('value-search')
    const limitDefault = 18
    let index = 1, limitNew = limitDefault * index

    return {
        async fetchApi(limitMovie) {
            try {
                const API_KEY = `https://phimapi.com/v1/api/tim-kiem?keyword=${valueSearch}&limit=${limitMovie}`
                const movieData = await fetchAPI(API_KEY)
                if (movieData?.data?.items.length === 0) {
                    this.handleNoResults()
                    return
                }
                this.handleSuccess(movieData)
            } catch (error) {
                hanleWhenDowloadingMoviesFail()
                console.log(error)
            }
        },
        handleNoResults() {
            const header = document.createElement('header')
            header.classList.add('title-name')
            header.innerHTML = `<div class="title-name">Không tìm thấy kết quả cho từ khóa: ${valueSearch}</div>`
            allMovie.appendChild(header)
        },
        handleSuccess(data) {
            document.title = data.data.titlePage
            this.renderAllMovie(data.data, allMovie)
            if (data.data.items.length >= limitDefault) {
                seeMoreButton.style.display = 'flex'
            }
        },
        renderAllMovie(data, element) {
            const htmls = `
                <header>
                    <div class="title-name">Kết quả tìm kiếm cho từ khóa: ${valueSearch}</div>
                </header>
                <div class="movies">
                    ${Movies(data?.items)}
                </div>
            `
            element.innerHTML = htmls
        },
        handleEvent() {
            seeMoreButton.addEventListener('click', () => {
                const moviesDisplayed = $$('.movie').length
                if (moviesDisplayed < limitNew) {
                    toastMessege({
                        title: 'Tải dữ liệu thất bại!',
                        message: 'Đã hiển thị toàn bộ phim.',
                        type: 'error'
                    })
                    return
                }
                index++
                limitNew = limitDefault * index
                this.fetchApi(limitNew)
                setTimeout(() => {
                    toastMessege({
                        title: 'Tải dữ liệu thành công!',
                        message: 'Phim đã được cập nhật.',
                        type: 'success'
                    })
                }, 1000)
            })
        },
        start() {
            Header(header)
            Footer(footer)
            initLoader(1000)
            this.fetchApi(limitDefault)
            this.handleEvent()
        }
    }
})()
searchPage.start()
