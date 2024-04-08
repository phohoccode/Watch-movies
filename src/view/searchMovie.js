import fetchAPI from "../utils/fectchAPI.js"
import movies from "../components/movies.js"
import { $, header, footer } from "../utils/base.js"
import handleHeader from "../utils/handleHeader.js"
import handleFeedback from "../utils/handleFeedback.js"
import componentRendering from "../utils/componentRendering.js"
import handleWatchMovie from "../utils/handleWatchMovie.js"
import handleAddMovieToWatchLater from "../utils/handleAddMovieToWatchLater.js"
import handleRemoveMovieToWatchLater from "../utils/handleRemoveMovieToWatchLater.js"
import renderHeader from "../components/renderHeader.js"
import toastMessege from "../utils/toastMessage.js"

const searchPage = (() => {
    const allMovie = $('.all-movieFound')
    const seeMoreButton = $('.see-more')
    const valueSearch = JSON.parse(localStorage.getItem('value-search'))
    const limitDefault = 18
    let index = 1, limitNew = limitDefault * index

    return {
        fetchApi(limitMovie) {
            const API_KEY = `https://phimapi.com/v1/api/tim-kiem?keyword=${valueSearch}&limit=${limitMovie}`
            fetchAPI(API_KEY)
                .then(data => {
                    if (data?.data?.items?.length === 0) {
                        this.handleError()
                        return
                    }
                    this.handleSuccess(data)
                })
                .catch(err => {
                    console.log('Error', err)
                })
        },
        handleError() {
            const err = document.createElement('header')
            err.classList.add('title-name')
            err.innerHTML = `<div class="title-name">Không tìm thấy kết quả cho từ khóa: ${valueSearch}</div>`
            allMovie.appendChild(err)
        },
        handleSuccess(data) {
            document.title = data.data.titlePage
            this.renderAllMovie(data.data, allMovie)
            if (data?.data?.items.length >= limitDefault) {
                seeMoreButton.style.display = 'flex'
            }
        },
        renderAllMovie(data, element) {
            const htmls = `
                <header>
                    <div class="title-name">Kết quả tìm kiếm cho từ khóa: ${valueSearch}</div>
                </header>
                <div class="movies">
                    ${movies(data?.items)}
                </div>
            `
            element.innerHTML = htmls
        },
        handleEvent() {
            handleHeader()
            handleWatchMovie()
            handleFeedback()

            seeMoreButton.addEventListener('click', () => {
                const moviesDisplayed = document.querySelectorAll('.movie').length
                if (moviesDisplayed < limitNew) {
                    toastMessege({
                        title: 'Đã hiển thị tất cả phim',
                        message: 'Phim sẽ được cập nhật thêm',
                        type: 'error'
                    })
                    return
                }
                index++
                limitNew = limitDefault * index
                this.fetchApi(limitNew)
            })
        },
        start() {
            renderHeader(header)
            componentRendering('./src/components/footer.html', footer)
            this.fetchApi(limitDefault)
            this.handleEvent()
        }
    }
})()
searchPage.start()
