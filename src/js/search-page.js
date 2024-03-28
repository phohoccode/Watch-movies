import fetchAPI from "./fectchAPI.js"
import { $, $$, handleClickButtonSearch, handleClickChangePage } from "./base.js"

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
                    ${data.items.map(movie => ` 
                    <div class="movie" data-slug="https://phimapi.com/phim/${movie.slug}">
                        <figure>
                            <a href="./infoMovie-page.html">
                            <img src="${movie.poster_url.includes('https://img.phimapi.com') ? movie.poster_url : 'https://img.phimapi.com/' + movie.poster_url}" alt="">
                            <div class="icon-play">
                                <i class="fa-solid fa-play"></i>
                            </div>

                            </a>
                        <span class="language">${movie.lang}</span>
                        </figure>
                        <a href="./infoMovie-page.html" class="movie-name">${movie.name}</a>
                    </div>
                    `).join('')}
                </div>
            `
            element.innerHTML = htmls
        },
        handleEvent() {
            handleClickButtonSearch()
            handleClickChangePage()

            allMovie.addEventListener('click', (e) => {
                const movie = e.target.closest('.movie')
                if (movie) {
                    const linkSlug = movie.dataset.slug
                    console.log(linkSlug)
                    localStorage.setItem('link-slug', JSON.stringify(linkSlug))
                }
            })
            
            seeMoreButton.addEventListener('click', () => {
                index++
                const limitNew = limitDefault * index
                this.fetchApi(limitNew)
            })
        },
        start() {
            this.fetchApi(limitDefault)
            this.handleEvent()
        }
    }
})()

searchPage.start()
