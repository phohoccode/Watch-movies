import { $, content, header, footer, renderComponent, handleClickWatchMovie, handleFeedback, handleClickHeader } from "./base.js"
import fetchAPI from "./fectchAPI.js"
import movies from "./component/movies.js"

const searchPage = (() => {
    const allMovie = $('.all-movieFound')
    const seeMoreButton = $('.see-more')
    const valueSearch = JSON.parse(localStorage.getItem('value-search'))
    const limitDefault = 18
    let index = 1

    return {
        fetchApi(limitMovie) {
            const API_KEY = `https://phimapi.com/v1/api/tim-kiem?keyword=${valueSearch}&limit=${limitMovie}`
            fetchAPI(API_KEY)
                .then(data => {
                    console.log(data.data)
                    if (data.data.items.length === 0) {
                        this.handleError()
                        return
                    } else {
                        document.title = data.data.titlePage
                        this.renderAllMovie(data.data, allMovie)
                        if (data.data.items.length >= limitDefault) {
                            seeMoreButton.style.display = 'flex'
                        }
                    }
                })
        },
        handleError() {
            const err = document.createElement('header')
            err.classList.add('title-name')
            err.innerHTML = `<div class="title-name">Không tìm thấy kết quả cho từ khóa: ${valueSearch}</div>`
            allMovie.appendChild(err)
        },
        renderAllMovie(data, element) {
            const htmls = `
                <header>
                    <div class="title-name">Kết quả tìm kiếm cho từ khóa: ${valueSearch}</div>
                </header>
                <div class="movies">
                    ${movies(data.items)}
                </div>
            `
            element.innerHTML = htmls
        },
        handleEvent() {
            handleClickHeader(header)
            handleClickWatchMovie(content)
            handleFeedback(footer)
            
            seeMoreButton.addEventListener('click', () => {
                index++
                const limitNew = limitDefault * index
                this.fetchApi(limitNew)
            })
        },
        start() {
            renderComponent('./componentHTML/header.html', header)
            renderComponent('./componentHTML/footer.html', footer)
            this.fetchApi(limitDefault)
            this.handleEvent()
        }
    }
})()

searchPage.start()
